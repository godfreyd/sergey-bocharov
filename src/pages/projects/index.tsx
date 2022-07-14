import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button'
import { Title } from '../../components/Title';
function Projects() {

    return (
        <BaseLayout>
        <Title tag="h1">Projects</Title>

        <Button onClick={() => window.history.back()}>Back</Button>
        </BaseLayout>
    );
}

export default Projects;

