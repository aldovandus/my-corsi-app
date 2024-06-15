type Props = {
    errors: any;
};

function FormErrors({ errors }: Props) {
    console.log({ errors });
    return (
        <div className="text-red-400">
            {Object.keys(errors)
                .slice(0, 3)
                .map((key) => (
                    <div className="text-red-500">{errors[key]}</div>
                ))}
        </div>
    );
}

export default FormErrors;
