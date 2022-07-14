import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button'
function Projects() {

    return (
        <BaseLayout>
        <div>Projects</div>
        
        <Button onClick={() => window.history.back()}>Назад</Button>
        </BaseLayout>
    );
}

export default Projects;

