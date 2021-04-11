import { useState } from 'react';


const AddTask = ({ onAdd }) => {

    const [text, setText] = useState('')
    const [day, setday] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text || !day) {
            alert('Please add task')
            return
        }

        onAdd({ text, day, reminder })

        setText('')
        setday('')
        setReminder(false)

    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}></input>
            </div>
            <div className='form-control'>
                <label>Day and Time</label>
                <input type='text' placeholder='Add Day and Time' value={day} onChange={(e) => setday(e.target.value)}></input>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input checked={reminder} type='checkbox' value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}></input>
            </div>

            <input type='submit' value='Save Task' className='btn btn-block' ></input>
        </form>
    )
}

export default AddTask
