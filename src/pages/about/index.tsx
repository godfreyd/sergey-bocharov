import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button'
import { Title } from '../../components/Title';
import { Timeline } from '../../components/Timeline';

const data = [
    {
        date: '',
        place: 'Яндекс',
        position: 'Frontend',
        description: 'Крутой разраб'
    },
    {
        date: '',
        place: 'Яндекс',
        position: 'Frontend',
        description: 'Крутой разраб'
    },

]
function About() {

    return (
        <BaseLayout>
        <Title tag="h1">About</Title>
        <Timeline data={data}/>
        <Button onClick={() => window.history.back()}>Back</Button>
        </BaseLayout>
    );
}

export default About;

