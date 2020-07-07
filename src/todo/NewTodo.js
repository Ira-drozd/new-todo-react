import React, {useState} from "react";
import PropTypes from 'prop-types'

const useInputValue = (defaultValue = '') => {

    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value

    }

}

function NewTodo({onCreate}) {
    // const [value, setValue] = useState('')
    const input = useInputValue('')

    const submitHendler = event => {
        event.preventDefault()
        if (input.value().trim()) {
            onCreate(input.value())
            // if(value.trim()){
            //     onCreate(value)
            // setValue('')
            input.clear()

        }
    }


    return (
        <form
            style={{marginBottom: '1rem'}}
            onSubmit={submitHendler}
        >
            <input
                {...input.bind}
                type="text"/>
            <button type='submit'>Add todo</button>
        </form>
    )
}

// value={value}
// onChange={event => setValue(event.target.value)}

NewTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default NewTodo