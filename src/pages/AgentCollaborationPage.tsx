import Navbar from '../components/NavBar'
import ExperimentForm from '../configs/ExperimentForm'
import { experiments } from '../configs/experiments'

export default function AgentCollaborationPage() {
    const config = experiments.find(e => e.key === 'agent-collaboration')
    return (
        <>
            <Navbar />
            {config && <ExperimentForm config={config} />}
        </>
    )
}
