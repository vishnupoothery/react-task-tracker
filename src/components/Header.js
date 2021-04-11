import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text={showAdd ? 'Close' : 'Add'} color={showAdd ? 'red' : 'teal'} onClick={onAdd}></Button>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.prototypes = {
    title: PropTypes.string,
}

export default Header