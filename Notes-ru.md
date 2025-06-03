# Обзор книги по React: Advanced React: Deep dives, investigations, performance patterns and techniques Hardcover от Nadia Makarevich (Author)

![Book Cover](public/advanced-react/cover.jpg)

## Содержание

1. Глава 1. Введение в повторные рендеры.
2. Глава 2. Элементы, потомки как пропсы и повторные рендеры.
3. Глава 3. Проблемы конфигурации с элементами в качестве пропсов.
4. Глава 4. Расширенная конфигурация с использованием render props.
5. Глава 5. Мемоизация с useMemo, useCallback и React.memo.
6. Глава 6. Глубокое погружение в диффинг и согласование.
7. Глава 7. Компоненты высшего порядка в современном мире.
8. Глава 8. Контекст React и производительность.
9. Глава 9. Refs: от хранения данных к императивному API.
10. Глава 10. Замыкания в React.
11. Глава 11. Реализация продвинутого дебаунса и троттлинга с Refs.
12. Глава 12. Избавление от мерцания интерфейса с useLayoutEffect.
13. Глава 13. React-порталы и зачем они нужны.
14. Глава 14. Получение данных на клиенте и производительность.
15. Глава 15. Получение данных и условия гонки.
16. Глава 16. Универсальная обработка ошибок в React.

## TLDR

**Глава 1: Введение в повторные рендеры**

✅ *Верно:* Выносить состояние в мелкие компоненты (State Colocation). 
❌ *Неверно:* Хранить состояние в корневых/общих компонентах без необходимости.
*Почему:* Обновления состояния вызывают ререндеры всех детей. Изоляция ограничивает область влияния изменений.

## Глава 1: Введение в повторные рендеры

### Проблема

Автор начинает с практического примера: разработчик получает в наследство большое производительное приложение и должен добавить простую модальную кнопку на верхнем уровне.

```js
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="layout">
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

*Пример*: [https://advanced-react.com/examples/01/01](https://advanced-react.com/examples/01/01)

*Результат*: Диалог открывается почти секунду - неприемлемо медленно.

### Ключевые концепции

**Что такое Re-render?**

- *Re-render* - это то, как React обновляет существующие компоненты с новыми данными
- Легковесный процесс: React переиспользует экземпляры компонентов, выполняет хуки, делает вычисления и обновляет DOM-элементы
- Критически важен для интерактивности - без повторных рендеров React-приложения были бы полностью статичными

**Жизненный цикл компонента:**

- *Mounting*: Компонент появляется на экране впервые
- *Unmounting*: Компонент удаляется и очищается
- *Re-rendering*: Компонент обновляется с новой информацией

### Анализ причин проблемы

**Как распространяются Re-render'ы:**

1. **Обновление состояния** - изначальный источник всех повторных рендеров
2. Когда состояние обновляется, компонент, содержащий это состояние, перерендеривается
3. React затем перерендеривает **все вложенные компоненты** вниз по дереву компонентов
4. React **никогда не поднимается "вверх"** по дереву рендера во время повторных рендеров
5. Все медленные компоненты перерендериваются без необходимости при изменении состояния модального окна

### Миф о Re-render'ах

**Распространенное заблуждение**: "Компонент перерендеривается при изменении его пропсов"

**Реальность**:

- Компоненты перерендериваются при обновлении состояния родителя, **независимо от пропсов**
- Изменения пропсов без обновления состояния "поглощаются" React'ом
- Пропсы имеют значение для повторных рендеров только при использовании `React.memo`

**Пример-доказательство:**

```js
const App = () => {
  let isOpen = false; // локальная переменная, не состояние
  
  return (
    <div>
      <Button onClick={() => (isOpen = true)}>Open dialog</Button>
      {/* Диалог никогда не появится */}
      {isOpen ? <ModalDialog /> : null}
    </div>
  );
};
```

*Пример*: [https://advanced-react.com/examples/01/02](https://advanced-react.com/examples/01/02)

### Решение: Вынос состояния вниз

Вынесем состояние и компоненты, которые от него зависят, в дочерний компонент.

```js
const ButtonWithModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
    </>
  );
};

const App = () => {
  return (
    <div className="layout">
      <ButtonWithModalDialog />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

*Пример*: [https://advanced-react.com/examples/01/03](https://advanced-react.com/examples/01/03)

**Почему это работает:**

![Как работает ререндер](public/advanced-react/image.png)

- Такой подход создает отдельную ветку в дереве рендера
- Обновления состояния влияют только на компоненты внутри `ButtonWithModalDialog`
- Остальная часть приложения остается не затронутой изменениями состояния модального окна

### Опасность кастомных хуков

Кастомные хуки могут скрывать проблемы производительности через абстракцию состояния:

```js
const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

const App = () => {
  const { isOpen, open, close } = useModalDialog();
  // Состояние скрыто, но всё равно вызывает повторные рендеры!
  
  return (
    <div className="layout">
      <Button onClick={open}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={close} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

*Пример*: [https://advanced-react.com/examples/01/04](https://advanced-react.com/examples/01/04)

**Пример скрытого состояния:**

```js
const useModalDialog = () => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const listener = () => setWidth(window.innerWidth);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);
  
  // width даже не возвращается, но App все равно перерендеривается при resize!
  return { /* логика модального окна */ };
};
```

*Пример*: [https://advanced-react.com/examples/01/05](https://advanced-react.com/examples/01/05)

**Аналогия от автора:**

> "Хуки — как карманы. Если положить в карман 10-килограммовую гирю, бежать не станет легче. Компоненты как тележки — они несут вес независимо."

**Решение для хуков**

Всё равно вынесите в отдельный компонент:

```js
const ButtonWithModalDialog = () => {
  const { isOpen, open, close } = useModalDialog();
  
  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={close} /> : null}
    </>
  );
};
```

*Пример*: [https://advanced-react.com/examples/01/07](https://advanced-react.com/examples/01/07)

### Основные выводы

1. *Повторный рендеринг* необходим для интерактивности в React и обновляет компоненты при получении новых данных
2. *Обновление состояния* — это исходный источник всех повторных рендеров в React-приложениях
3. *Нисходящее распространение*: повторный рендеринг компонента вызывает ререндер всех вложенных компонентов
4. *Миф о пропсах*: при обычных рендерах React изменения пропсов не имеют значения — компоненты ререндерятся в любом случае
5. Паттерн *перемещения состояния вниз* предотвращает лишние ререндеры в крупных приложениях
6. *Пользовательские хуки* могут скрывать проблемы с производительностью — состояние внутри хука всё равно вызывает ререндер компонента
7. *Цепочки хуков* распространяют ререндеры по всей цепочке до потребляющего компонента
8. *Принцип изоляции*: держите состояние в самых маленьких и лёгких компонентах

































## Глава 2: Elements, Children as Props и Re-renders (продолжение)

### Паттерн "Children as Props"

После изучения передачи компонентов через props, автор представляет более элегантное решение - использование паттерна "children as props". Этот подход решает основную проблему предыдущего метода: передача контента через произвольные props выглядит неестественно.

**Преобразование от components as props к children:**

```js
// Было (неуклюжий синтаксис)
const App = () => {
  const slowComponents = (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
  
  return <ScrollableWithMovingBlock content={slowComponents} />;
};

// Стало (естественный синтаксис)
const App = () => {
  return (
    <ScrollableWithMovingBlock>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </ScrollableWithMovingBlock>
  );
};
```

**Ключевое изменение в компоненте:**
```js
// Просто переименовываем prop с content на children
const ScrollableWithMovingBlock = ({ children }) => {
  const [position, setPosition] = useState(300);
  
  const onScroll = (e) => {
    const calculated = getPosition(e.target.scrollTop);
    setPosition(calculated);
  };
  
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {children}
    </div>
  );
};
```

### Важные выводы главы 2

1. **Природа props**: `children` - это обычный prop, ничего особенного в нем нет
2. **JSX синтаксис**: `<Parent><Child /></Parent>` эквивалентен `<Parent children={<Child />} />`
3. **Производительность**: Оба паттерна дают одинаковые преимущества в производительности
4. **React reconciliation**: React использует `Object.is()` для сравнения элементов

---

## Глава 3: Проблемы конфигурации с elements as props

### Основная проблема: Переусложнение компонентов

Автор начинает с классического примера - компонента Button, который должен показывать иконку загрузки. Показывается, как простое требование может привести к "аду пропсов":

**Эволюция компонента Button:**

```js
// Начало - простая реализация
const Button = ({ isLoading }) => {
  return (
    <button>Submit {isLoading ? <Loading /> : null}</button>
  );
};

// Конец - кошмар конфигурации
const Button = ({
  isLoading,
  iconLeftName,
  iconLeftColor,
  iconLeftSize,
  isIconLeftAvatar,
  iconRightName,
  iconRightColor,
  // ... еще десятки пропсов
}) => {
  // никто не понимает, что здесь происходит
  return ...
};
```

### Решение через Elements as Props

**Элегантное решение:**
```js
const Button = ({ icon }) => {
  return <button>Submit {icon}</button>;
};

// Использование - вся конфигурация у потребителя
<Button icon={<Loading />} />                                    // стандартная иконка
<Button icon={<Error color="red" />} />                         // красная иконка ошибки  
<Button icon={<Warning color="yellow" size="large" />} />       // большая желтая иконка
<Button icon={<Avatar />} />                                    // аватар вместо иконки
```

### Практические применения

**1. Модальные диалоги:**
```js
const ModalDialog = ({ content, footer }) => {
  return (
    <div className="modal-dialog">
      <div className="content">{content}</div>
      <div className="footer">{footer}</div>
    </div>
  );
};

// Гибкое использование
<ModalDialog 
  content={<SomeFormHere />} 
  footer={<><SubmitButton /><CancelButton /></>} 
/>
```

**2. Макеты (layouts):**
```js
<ThreeColumnsLayout
  leftColumn={<Navigation />}
  middleColumn={<MainContent />}
  rightColumn={<SidebarAds />}
/>
```

### Производительность и условный рендеринг

**Важный момент о производительности:**
```js
const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Этот элемент создается всегда, но НЕ рендерится до нужного момента
  const footer = <Footer />;
  
  return isDialogOpen ? (
    <ModalDialog footer={footer} />
  ) : null;
};
```

**Ключевое понимание**: Создание Element (объекта) ≠ Рендеринг компонента. Элементы - это просто объекты в памяти, рендеринг происходит только когда они попадают в return другого компонента.

### Продвинутая техника: Default Props через cloneElement

**Проблема**: Как сохранить гибкость паттерна, но добавить разумные defaults?

**Решение через React.cloneElement:**
```js
const Button = ({ appearance, size, icon }) => {
  // Создаем default props для иконки
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  const newProps = {
    ...defaultIconProps,
    // Пропсы иконки перезаписывают defaults
    ...icon.props,
  };

  // Клонируем иконку с новыми пропсами
  const clonedIcon = React.cloneElement(icon, newProps);

  return <button>Submit {clonedIcon}</button>;
};

// Теперь работает "магически"
<Button appearance="primary" icon={<Loading />} />      // белая иконка автоматически
<Button appearance="secondary" icon={<Loading />} />    // черная иконка автоматически
<Button size="large" icon={<Loading />} />              // большая иконка автоматически

// Но можно переопределить
<Button appearance="secondary" icon={<Loading color="red" />} />  // красная иконка
```

### Предостережения с cloneElement

**Опасность неправильного использования:**
```js
// НЕПРАВИЛЬНО - это сломает API иконки
const clonedIcon = React.cloneElement(
  icon,
  defaultIconProps  // defaults перезапишут все пропсы иконки
);

// ПРАВИЛЬНО - defaults идут первыми, потом пропсы иконки
const clonedIcon = React.cloneElement(icon, {
  ...defaultIconProps,
  ...icon.props,
});
```

Автор предупреждает, что этот паттерн очень хрупкий и легко сломать, поэтому рекомендует использовать его только для простых случаев.

### Ключевые выводы главы 3

1. **Elements as props** решают проблему переусложнения конфигурации компонентов
2. Паттерн особенно полезен для макетов и модальных окон
3. Условный рендеринг не влияет на производительность создания элементов
4. `React.cloneElement` позволяет добавлять default props, но требует осторожности
5. Баланс между гибкостью и простотой использования - ключевая задача при проектировании API компонентов

---

## Общие принципы из глав 1-3

**Фундаментальное понимание:**
- **Компонент** = функция, возвращающая элементы
- **Элемент** = объект, описывающий что рендерить
- **Реактивность** = вызов функции компонента при изменении состояния
- **Оптимизация** = предотвращение ненужных вызовов через стабильные ссылки на объекты

**Паттерны производительности:**
1. Вынос состояния вниз - для изоляции re-render'ов в маленьких компонентах
2. Components as props - для защиты медленных компонентов от ре-рендеров
3. Children as props - более естественный синтаксис того же паттерна
4. Elements vs Components - понимание разницы критично для оптимизации

**Паттерны архитектуры:**
1. Elements as props - для гибкой конфигурации компонентов
2. Default props через cloneElement - для разумных defaults при сохранении гибкости
3. Композиция вместо конфигурации - основной принцип React

**Философия**: Вместо попыток предсказать и сконфигурировать каждый возможный сценарий использования через props, React поощряет передачу реальных элементов и позволяет потребителям самим управлять их конфигурацией. Это приводит к более гибким, поддерживаемым и производительным приложениям.

**Главное правило производительности**: "Где вы размещаете состояние - очень важно. В идеале изолируйте его как можно больше в как можно более мелких и легких компонентах."






























**Глава 2: Паттерны композиции**  
✅ **Делать:** Использовать `children` для передачи элементов (естественный синтаксис)  
❌ **Не делать:** Создавать искусственные пропсы типа `content` для рендеринга  
**Почему:** React автоматически мемоизирует стабильные элементы. Дочерние компоненты не ререндерятся, если их пропсы-элементы не меняются.

**Глава 3: Гибкие компоненты**  
✅ **Делать:** Передавать элементы как пропсы для кастомизации  
❌ **Не делать:** Добавлять десятки конфигурационных пропсов в компонент  
**Почему:** Делегирование рендеринга через элементы сохраняет API простым, а `cloneElement` позволяет добавлять дефолты без потери гибкости.













# Глава 4: Продвинутая конфигурация с Render Props - Краткое изложение

## Обзор
Эта глава исследует паттерн render props как решение для сценариев продвинутой конфигурации компонентов, которые невозможно решить с помощью элементов как props. Рассматривается совместное использование состояния с логикой, эволюция от render props к хукам, и когда render props все еще полезны сегодня.

## Основные рассматриваемые концепции

### 1. Что такое Render Props?
- **Render prop** - это функция, которая возвращает Element/JSX
- Похожа на Компонент, но вы вызываете ее напрямую, а не React
- Предоставляет явный контроль над рендерингом и потоком данных
- Альтернатива элементам как props для более сложных сценариев

### 2. Ограничения элементов как Props
Когда компонент, принимающий другие компоненты через props, должен:
- Динамически влиять на их props
- Передавать им внутреннее состояние
- Делиться данными явным, не магическим способом

Элементы как props и `cloneElement` не могут помочь в этих сценариях.

## Пример проблемы

### Сценарий
Компонент Button, который принимает элемент иконки и должен делиться с ней состоянием наведения.

### Первоначальная реализация с элементами как Props
```js
const Button = ({ appearance, size, icon }) => {
  const [isHovered, setIsHovered] = useState();
  
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  const newProps = { ...defaultIconProps, ...icon.props };
  const ClonedIcon = React.cloneElement(icon, newProps);
  
  return (
    <button 
      className={`button ${appearance}`}
      onMouseOver={() => setIsHovered(true)}
    >
      Submit {ClonedIcon}
    </button>
  );
};
```

### Проблемы с этим подходом
1. **Предположения о props**: Предполагает, что иконки имеют props `size` и `color`
2. **Совместимость с библиотеками**: Разные библиотеки иконок могут использовать разные имена props
3. **Сложность совместного использования состояния**: Трудно поделиться состоянием наведения с иконкой
4. **Скрытая магия**: Поведение `cloneElement` не является явным

## Решение 1: Render Props для элементов

### Базовая реализация Render Prop
```js
// Вместо принятия Element, принимаем функцию, которая возвращает Element
const Button = ({ renderIcon }) => {
  return <button>Submit {renderIcon()}</button>;
};

// Использование - передаем функцию вместо элемента
<Button renderIcon={() => <HomeIcon />} />
```

### Передача Props в Render функции
```js
const Button = ({ appearance, size, renderIcon }) => {
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  // Передаем props в функцию
  return (
    <button>Submit {renderIcon(defaultIconProps)}</button>
  );
};

// Использование - принимаем и используем props
<Button renderIcon={(props) => <HomeIcon {...props} />} />

// Переопределяем конкретные props
<Button renderIcon={(props) => (
  <HomeIcon {...props} size="large" color="red" />
)} />

// Конвертируем props для разных библиотек
<Button renderIcon={(props) => (
  <HomeIcon 
    fontSize={props.size}
    style={{ color: props.color }}
  />
)} />
```

### Совместное использование состояния с Render Props
```js
const Button = ({ appearance, size, renderIcon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iconParams = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
    isHovered, // Добавляем состояние в параметры
  };
  
  return (
    <button 
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      Submit {renderIcon(iconParams)}
    </button>
  );
};

// Использование - доступ к состоянию наведения
const icon = (props, state) => 
  state.isHovered ? 
    <HomeIconHovered {...props} /> : 
    <HomeIcon {...props} />;

<Button renderIcon={icon} />
```

**Живой пример**: [https://advanced-react.com/examples/04/01](https://advanced-react.com/examples/04/01)

## Решение 2: Children как Render Props

### Базовый паттерн
```js
// Children тоже могут быть функцией
<Parent children={() => <Child />} />

// Красивый вложенный синтаксис тоже работает
<Parent>{() => <Child />}</Parent>

// В компоненте Parent
const Parent = ({ children }) => {
  return children(); // Просто вызываем как любой render prop
};
```

### Совместное использование состояния с Children как функцией

#### Пример ResizeDetector
```js
const ResizeDetector = ({ children }) => {
  const [width, setWidth] = useState();
  
  useEffect(() => {
    const listener = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    
    window.addEventListener("resize", listener);
    // код очистки...
  }, []);
  
  // Передаем width в children
  return children(width);
};

// Использование - не нужно промежуточное состояние
const Layout = () => {
  return (
    <ResizeDetector>
      {(windowWidth) => {
        return windowWidth > 600 ? (
          <WideLayout />
        ) : (
          <NarrowLayout />
        );
      }}
    </ResizeDetector>
  );
};
```

**Живой пример**: [https://advanced-react.com/examples/04/04](https://advanced-react.com/examples/04/04)

## Революция хуков

### Как хуки заменили Render Props
Та же логика ResizeDetector может быть извлечена в пользовательский хук:

```js
const useResizeDetector = () => {
  const [width, setWidth] = useState();
  
  useEffect(() => {
    const listener = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    
    window.addEventListener("resize", listener);
    // код очистки...
  }, []);
  
  return width;
};

// Гораздо более простое использование
const Layout = () => {
  const windowWidth = useResizeDetector();
  
  return windowWidth > 600 ? (
    <WideLayout />
  ) : (
    <NarrowLayout />
  );
};
```

### Почему хуки лучше для совместного использования логики
- **Меньше кода**: Более лаконично и читаемо
- **Легче понять**: Прямое использование без сложности render функций
- **Лучшая композиция**: Хуки легко комбинируются

## Когда Render Props все еще полезны

### 1. Конфигурация и гибкость
Render props для конфигурации компонентов (как в примере с Button) все еще очень жизнеспособны и полезны.

### 2. Устаревшие кодовые базы
- Популярный паттерн до введения хуков
- Особенно распространен для логики валидации форм
- Многие библиотеки все еще используют этот паттерн

### 3. Логика, зависящая от DOM
Когда логика зависит от конкретного DOM элемента, render props могут быть более прямолинейными, чем хуки.

#### Пример ScrollDetector
```js
const ScrollDetector = ({ children }) => {
  const [scroll, setScroll] = useState();
  
  return (
    <div onScroll={(e) => setScroll(e.currentTarget.scrollTop)}>
      {children(scroll)}
    </div>
  );
};

// Использование
const Layout = () => {
  return (
    <ScrollDetector>
      {(scroll) => {
        return <>{scroll > 30 ? <SomeBlock /> : null}</>;
      }}
    </ScrollDetector>
  );
};
```

**Живой пример**: [https://advanced-react.com/examples/04/06](https://advanced-react.com/examples/04/06)

### Почему не просто использовать хук?
Для логики, зависящей от DOM, вам потребуется:
- Ввести Ref и передавать его
- Вручную прикреплять слушатели событий
- Обрабатывать очистку

Render props сохраняют логику автономной и явной.

## Ключевые выводы

### 1. **Случай использования конфигурации**
Если компонент с элементами как props хочет контролировать их props или передавать им состояние, конвертируйте эти элементы в render props:

```js
const Button = ({ renderIcon }) => {
  const [someState, setSomeState] = useState();
  const someProps = { /* ... */ };
  
  return (
    <button>
      {renderIcon(someProps, { someState })}
    </button>
  );
};

<Button renderIcon={(props, state) => (
  <IconComponent {...props} someProps={state} />
)} />
```

### 2. **Children как Render Props**
Children также могут быть render props, включая синтаксис "вложения":

```js
const Parent = ({ children }) => {
  return children(someData);
};

<Parent>
  {(data) => <Child data={data} />}
</Parent>
```

### 3. **Исторический контекст**
- Render props были очень полезны для совместного использования состояния с логикой до хуков
- Хуки заменили этот случай использования в 99% случаев
- Все еще полезны для логики, зависящей от DOM, и конфигурации

### 4. **Современное использование**
Render props для совместного использования состояния с логикой все еще могут быть полезны сегодня, особенно когда логика привязана к DOM элементу.

## Рекомендации по производительности
> "Render props для конфигурации и гибкости все еще очень жизнеспособны, но для совместного использования логики предпочитайте хуки в большинстве случаев."

---


**Глава 4: Продвинутая конфигурация с Render Props**  
✅ **Делать:** Использовать render props когда нужно делиться состоянием или контролировать пропсы вложенных компонентов  
❌ **Не делать:** Использовать cloneElement когда нужно передавать динамическое состояние элементам  
**Почему:** Render props обеспечивают явный поток данных и позволяют компонентам делиться внутренним состоянием с дочерними элементами, в то время как cloneElement работает только со статичными пропсами.























**Глава 5: Мемоизация**  
✅ **Делать:** Используйте мемоизацию только с React.memo компонентами или в массивах зависимостей  
❌ **Не делать:** Мемоизировать пропсы обычных компонентов или "дорогие" вычисления без измерений  
**Почему:** Мемоизация имеет накладные расходы и часто работает не как ожидается. Большинство "дорогих" вычислений быстрее, чем ре-рендеры компонентов.

### Russian: Понимание мемоизации в React

#### Основные концепции

**Сравнение по ссылкам в JavaScript**
- Примитивы (строки, числа) сравниваются по значению
- Объекты, массивы и функции сравниваются по ссылке
- React использует сравнение по ссылкам для определения изменений

**Как работают useMemo и useCallback**
- Оба хука кэшируют результаты между ре-рендерами
- `useCallback(fn, deps)` - мемоизирует саму функцию
- `useMemo(() => value, deps)` - мемоизирует результат выполнения функции
- Инлайн-функция, передаваемая в оба хука, пересоздается на каждом рендере

#### Когда мемоизация действительно работает

**1. С компонентами React.memo**
```js
const ChildMemo = React.memo(Child);

const Parent = () => {
  // ✅ Это нужно мемоизировать для работы React.memo
  const data = useMemo(() => ({ id: 1 }), []);
  const onChange = useCallback(() => {}, []);
  
  return <ChildMemo data={data} onChange={onChange} />;
};
```

**2. Как зависимости хуков**
```js
const Component = () => {
  const submit = useCallback(() => {}, []);
  
  useEffect(() => {
    submit();
  }, [submit]); // ✅ Мемоизированная зависимость предотвращает бесконечные циклы
};
```

#### Распространенные анти-паттерны

**1. Мемоизация пропсов обычных компонентов**
```js
// ❌ Бесполезно - кнопка всё равно перерендерится при ре-рендере родителя
const Component = () => {
  const onClick = useCallback(() => {}, []);
  return <button onClick={onClick}>Click me</button>;
};
```

**2. Сломанная мемоизация с разворачиванием пропсов**
```js
// ❌ Ломает мемоизацию - объект data не мемоизирован
const Parent = () => {
  return <ChildMemo {...props} data={{ id: 1 }} />;
};
```

**3. Проблемы с children как пропсами**
```js
// ❌ Children - это пересоздаваемые объекты, ломающие мемоизацию
const Component = () => {
  return (
    <ChildMemo>
      <div>Контент</div>
    </ChildMemo>
  );
};

// ✅ Исправленная версия
const Component = () => {
  const content = useMemo(() => <div>Контент</div>, []);
  return <ChildMemo>{content}</ChildMemo>;
};
```

#### Правила для React.memo

1. **Никогда не разворачивайте пропсы** из других компонентов
2. **Избегайте не-примитивных пропсов** из других компонентов
3. **Избегайте не-примитивных значений** из кастомных хуков
4. **Помните, что children** - это тоже пропс, требующий мемоизации

#### Миф о дорогих вычислениях

- Большинство "дорогих" вычислений на самом деле быстрее, чем ре-рендеры компонентов
- Всегда измеряйте перед оптимизацией
- Учитывайте контекст: возможности устройства, частота выполнения, влияние на пользовательский опыт
- Сосредоточьтесь на уменьшении ненужных ре-рендеров вместо микро-оптимизаций

#### Ключевые выводы

**Russian:**
- Мемоизация сложнее, чем кажется, и часто работает не как ожидается
- Используйте мемоизацию только с React.memo компонентами или как зависимости хуков
- Сосредоточьтесь на предотвращении ненужных ре-рендеров, а не на микро-оптимизациях
- Всегда измеряйте производительность до и после оптимизаций
- Будьте осторожны с разворачиванием пропсов и кастомными хуками - они могут сломать мемоизацию









# Глава 6: Глубокое погружение в диффинг и рекончиляцию

## Основные концепции

Эта глава раскрывает фундаментальные принципы работы React - как он определяет, какие компоненты нужно перерендерить, удалить или добавить на экран. Все начинается с понимания того, что JSX - это просто синтаксический сахар для функции `React.createElement`, которая возвращает объекты описания с полем `type`.

## Загадочный баг

Автор начинает с интересного примера формы регистрации, где есть чекбокс "Я регистрируюсь как компания". В зависимости от состояния показывается разный контент:

```js
const Form = () => {
  const [isCompany, setIsCompany] = useState(false);
  
  return (
    <>
      {isCompany ? (
        <Input id="company-tax-id-number" placeholder="Enter company Tax ID" />
      ) : (
        <TextPlaceholder>You don't have to give us your tax ID, lucky human.</TextPlaceholder>
      )}
    </>
  );
};
```

**Ожидаемое поведение:** При переключении чекбокса компоненты должны размонтироваться и монтироваться заново, теряя внутреннее состояние.

Но что происходит, если нам нужно собирать налоговый ID и от компаний, и от людей?

```js
const Form = () => {
  const [isCompany, setIsCompany] = useState(false);
  
  return (
    <>
      {isCompany ? (
        <Input id="company-tax-id-number" placeholder="Enter company Tax ID" />
      ) : (
        <Input id="person-tax-id-number" placeholder="Enter personal Tax ID" />
      )}
    </>
  );
};
```

**Неожиданное поведение:** Теперь при переключении текст в поле НЕ исчезает! React переиспользует один и тот же компонент Input.

[Интерактивный пример](https://advanced-react.com/examples/06/01)

## Диффинг и рекончиляция

### Как работает Virtual DOM

React создает Virtual DOM - это дерево объектов, представляющих компоненты и их пропсы. Например:

```js
const Component = () => {
  return (
    <div>
      <Input placeholder="Text1" id="1" />
      <Input placeholder="Text2" id="2" />
    </div>
  );
}
```

Превращается в:

```js
{
  type: 'div',
  props: {
    children: [
      { type: Input, props: { id: "1", placeholder: "Text1" } },
      { type: Input, props: { id: "2", placeholder: "Text2" } }
    ]
  }
}
```

### Алгоритм сравнения

При ререндере React сравнивает объекты "до" и "после":

1. **Если `type` одинаковый** → переиспользует существующий компонент (ререндер)
2. **Если `type` изменился** → размонтирует старый, монтирует новый

В нашем загадочном примере:
- **До:** `{ type: Input, props: { id: "company-tax-id-number" } }`
- **После:** `{ type: Input, props: { id: "person-tax-id-number" } }`

`type` остался тем же (ссылка на функцию Input), поэтому React просто обновляет пропсы существующего компонента.

## Почему нельзя определять компоненты внутри других компонентов

```js
// ❌ ПЛОХО
const Parent = () => {
  const Child = () => <input />;
  return <Child />;
};
```

При каждом ререндере `Parent` создается новая функция `Child`. React видит разные ссылки на функции и считает, что это разные компоненты, поэтому размонтирует старый и монтирует новый. Это приводит к:

- Потере состояния
- Плохой производительности (перемонтирование в 2+ раза медленнее ререндера)
- Эффекту "мерцания"

[Интерактивный пример](https://advanced-react.com/examples/06/02)

## Рекончиляция и массивы

### Позиционное сравнение

React сравнивает элементы массива по позициям:

```js
// До
[{ type: Checkbox }, null, { type: Input }]

// После  
[{ type: Checkbox }, { type: Input }, null]
```

React сравнивает:
- Позиция 0: Checkbox → Checkbox (ререндер)
- Позиция 1: null → Input (монтирование)  
- Позиция 2: Input → null (размонтирование)

[Интерактивный пример](https://advanced-react.com/examples/06/03)

### Решение загадочного бага

Изменив позиции элементов в массиве, мы заставляем React правильно размонтировать/монтировать компоненты:

```js
const Form = () => {
  const [isCompany, setIsCompany] = useState(false);
  
  return (
    <>
      <Checkbox onChange={() => setIsCompany(!isCompany)} />
      {isCompany ? (
        <Input id="company-tax-id-number" />
      ) : null}
      {!isCompany ? (
        <Input id="person-tax-id-number" />  
      ) : null}
    </>
  );
};
```

## Атрибут `key`

### Назначение key

`key` - это уникальный идентификатор элемента в массиве детей, который помогает React правильно сопоставлять элементы между ререндерами.

**Без key:**
```js
// До
[{ type: Input }, { type: Input }] // "1", "2"

// После (переставили)  
[{ type: Input }, { type: Input }] // "2", "1"
```

React думает, что первый элемент просто изменил данные, и обновляет его пропсы. Состояние остается на месте.

**С key:**
```js
// До
[{ type: Input, key: '1' }, { type: Input, key: '2' }]

// После
[{ type: Input, key: '2' }, { type: Input, key: '1' }]
```

React понимает, что элементы поменялись местами, и физически переставляет DOM-узлы.

### Key и мемоизация

Важное заблуждение: key НЕ предотвращает ререндеры. Он только помогает правильно сопоставлять элементы.

```js
const InputMemo = React.memo(Input);

// ❌ Плохой key - индекс массива
data.map((item, index) => (
  <InputMemo key={index} placeholder={item.placeholder} />
))

// ✅ Хороший key - стабильный идентификатор  
data.map((item) => (
  <InputMemo key={item.id} placeholder={item.placeholder} />
))
```

При переупорядочивании с индексом как key:
- React думает, что props изменились
- Мемоизация не работает
- Происходят ненужные ререндеры

[Интерактивный пример списков](https://advanced-react.com/examples/06/05)

## Техника сброса состояния

Key можно использовать не только в массивах. Любое изменение key приводит к размонтированию старого и монтированию нового компонента.

### Исправление исходного бага

```js
const Form = () => {
  const [isCompany, setIsCompany] = useState(false);
  
  return (
    <>
      <Checkbox onChange={() => setIsCompany(!isCompany)} />
      {isCompany ? (
        <Input key="company-tax-id-number" id="company-tax-id-number" />
      ) : (
        <Input key="person-tax-id-number" id="person-tax-id-number" />  
      )}
    </>
  );
};
```

Теперь key разные, поэтому React будет размонтировать один Input и монтировать другой.

[Интерактивный пример](https://advanced-react.com/examples/06/06)

### Сброс состояния при изменении URL

```js
const Component = () => {
  const { url } = useRouter();
  
  return <Input id="some-id" key={url} />;
};
```

При изменении URL компонент перемонтируется, сбрасывая состояние.

## Принуждение к переиспользованию элементов

Key также может заставить React переиспользовать элементы в разных позициях:

```js
const Form = () => {
  const [isCompany, setIsCompany] = useState(false);
  
  return (
    <>
      <Checkbox onChange={() => setIsCompany(!isCompany)} />
      {isCompany ? (
        <Input key="tax-input" id="company-tax-id-number" />
      ) : null}
      {!isCompany ? (
        <Input key="tax-input" id="person-tax-id-number" />  
      ) : null}
    </>
  );
};
```

Одинаковый key заставляет React переиспользовать компонент, даже если он находится в разных позициях массива.

## Забавные случаи с key

### Key вне массивов

```js
const Component = () => {
  const [isReverse, setIsReverse] = useState(false);
  
  return (
    <>
      <Input key={isReverse ? 'some-key' : null} />
      <Input key={!isReverse ? 'some-key' : null} />
    </>
  );
};
```

[Интерактивный пример](https://advanced-react.com/examples/06/08)

### Смешивание динамических и статических элементов

React достаточно умен, чтобы правильно обрабатывать смешанный контент:

```js
return (
  <>
    {data.map((i) => <Input key={i} id={i} />)}
    <Input id="3" /> {/* Не перемонтируется при изменении массива */}
  </>
);
```

React создает массив где первый элемент - это весь динамический массив, а второй - статический Input.

---

## TLDR

**Глава 6: Диффинг и рекончиляция**  
✅ **Делать:** Используйте стабильные идентификаторы для key в динамических списках, выносите компоненты за пределы рендер-функций, используйте key для сброса состояния при необходимости  
❌ **Не делать:** Определять компоненты внутри других компонентов, использовать индекс массива как key для изменяемых списков, игнорировать позиционную природу сравнения React  
**Почему:** React сравнивает элементы по типу и позиции в массиве. Неправильное понимание этого приводит к багам с состоянием, плохой производительности и непредсказуемому поведению UI.