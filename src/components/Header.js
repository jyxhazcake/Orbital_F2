import Button from './Button'
import PropTypes from 'prop-types'

const Header = ({ onLogin }) => {
    return (
        <header className = 'headerr'>
           <h1>Volunteer Opportunity Job Board</h1> 
           <Button color = 'green' text = 'I want to post a job' onClick = {onLogin} />
           <Button color = 'red' text = 'I want to find a job' onClick = {onLogin} />
        </header>
    )
}

export default Header
