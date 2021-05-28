import Button from './Button'
import PropTypes from 'prop-types'

const Header = () => {
    return (
        <header className = 'headerr'>
           <h1>Volunteer Opportunity Job Board</h1> 
           <Button color = 'green' text = 'I want to post a job' />
           <Button color = 'red' text = 'I want to find a job' />
        </header>
    )
}

export default Header
