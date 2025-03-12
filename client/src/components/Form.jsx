/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/input";
import { useEffect, useState } from 'react';

const Form = ({ fields, onSubmit, initialValues }) => {
    const [formData, setFormData] = useState(initialValues || {});

    useEffect(() => {
        setFormData(initialValues || {}); // Update form data when initialValues change
    }, [initialValues]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='p-2 h-full w-full '>
            <div className='grid grid-cols-2 gap-4'>
                {fields.map((field) => (
                    <div key={field.name} className='flex justify-between w-full'>
                        {/* <label htmlFor={field.name} className='w-3/12'>{field.label}</label> */}
                        {field.type === 'radio' ? (
                            <div className='w-9/12 '>
                                <div className='flex justify-evenly w-ful'>
                                    <label htmlFor={field.name} className='w-12/12'>{field.label}</label>
                                    {field.options.map(option => (
                                        <label key={option.value} className='w-full mx-4'>
                                            <Input
                                                type="radio"
                                                name={field.name}
                                                value={option.value}
                                                checked={formData[field.name] === option.value}
                                                onChange={handleChange}
                                                required={field.required}
                                                className='mr-2'
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ) : field.type === 'checkbox' ? (
                            <Input
                                id={field.name}
                                type="checkbox"
                                name={field.name}
                                checked={formData[field.name] || false}
                                onChange={handleChange}
                                className='w-9/12 p-2 mb-4'
                            />
                        ) : (
                            <Input
                                label={field.label}
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                className='w-full mb-4 border rounded-xl'
                            />
                        )}
                    </div>
                ))}
            </div>

            <button type="submit" className='transition ease-in-out duration-300 bg-background px-4 py-2 rounded-lg border text-white hover:bg-white hover:text-background hover:border hover:border-background'>Submit</button>

        </form>
    );
};

export default Form;