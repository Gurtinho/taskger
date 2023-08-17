import Select from 'react-select';
import { ICategoriesProps } from '../../../../pages/Dashboard';

interface ISelectProps {
    label: string;
    options: {
        value: string;
        label: string;
    }[]
    onChange: (selectedOption: ICategoriesProps | null) => void;
}

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        width: '100%',
        border: '1px solid #e2e8f0',
        borderRadius: '0.25rem',
        borderColor: 'none',
        outline: 'none !important',
        '&:hover': {
            borderColor: 'none',
        },
        '&:focus': {
            outline: 'none !important',
        },
    }),
    menu: (provided: any) => ({
        ...provided,
        background: 'white',
        '&:focus': {
            borderColor: 'none',
        },
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#22C55E' : 'white',
        color: state.isSelected ? 'white' : 'black',
        '&:hover': {
            background: '#86EFAC',
        },
    }),
};

export const InputSelect = ({ label, options, onChange }: ISelectProps) => {
    return (
        <label>
            <span>{label}</span>
            <Select
                options={options}
                defaultValue={options[0]}
                styles={customStyles}
                onChange={onChange}
                maxMenuHeight={200}
            />
        </label>
    )
}