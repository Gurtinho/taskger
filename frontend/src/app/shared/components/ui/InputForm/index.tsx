interface IInputProps {
    name?: string;
    value: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    onChange?: (value: string) => void;
}

export const InputForm: React.FC<IInputProps> = (props) => {
    return (
        <label className='flex flex-col'>
            <span>{props.name}</span>
            <input
                className='border-2 rounded-md outline-none text-sm py-2 pl-2'
                type={props.type} value={props.value}
                placeholder={props.placeholder}
                onChange={(event) => props.onChange && props.onChange(event.target.value)}
            />
        </label>
    )
}