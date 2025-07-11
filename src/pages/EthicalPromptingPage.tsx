import Navbar from '../components/NavBar'
import ExperimentForm from '../configs/ExperimentForm'
import { experiments } from '../configs/experiments'

export default function EthicalPromptingPage() {
    const config = experiments.find(e => e.key === 'ethical-prompting')
    return (
        <>
            <Navbar />
            {config && <ExperimentForm config={config} />}
        </>
    )
}
