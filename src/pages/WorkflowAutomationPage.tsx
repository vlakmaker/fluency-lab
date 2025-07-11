import Navbar from '../components/NavBar'
import ExperimentForm from '../configs/ExperimentForm'
import { experiments } from '../configs/experiments'

export default function WorkflowAutomationPage() {
    const config = experiments.find(e => e.key === 'workflow-automation')
    return (
        <>
            <Navbar />
            {config && <ExperimentForm config={config} />}
        </>
    )
}
