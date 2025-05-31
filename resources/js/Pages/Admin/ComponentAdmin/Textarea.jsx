import { useRef, useEffect } from "react";

const Textarea = ({ value, onChange, name, placeholder }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="textarea border-none textarea-primary bg-gray-100 w-full overflow-hidden resize-none min-h-[3rem]"
            required
        />
    );
};

export default Textarea;
