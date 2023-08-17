import { FormEvent } from 'react';

interface IButtonProps {
    children: string;
    value?: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: (event: FormEvent<Element>) => Promise<void> | void;
}

export const ButtonSuccess: React.FC<IButtonProps> = (props) => {
    return (
        <button
            type={props.type}
            value={props.value}
            className='w-full border-solid border-2 border-green-400 rounded-md py-2 font-medium hover:bg-green-400 ease-in-out duration-300'
            onClick={(event) => props.onClick && props.onClick(event)}
        >{props.children}
        </button>
    )
}