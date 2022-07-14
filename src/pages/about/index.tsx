import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button'

function About() {

    return (
        <BaseLayout>
        <div>About</div>
        <Button onClick={() => window.history.back()}>Назад</Button>
        </BaseLayout>
    );
}

export default About;

