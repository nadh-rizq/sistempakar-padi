import React, { useEffect, useRef } from "react";

export default function CustomSelect({
    name,
    label,
    formData,
    setFormData,
    data = [],
    disabled = false,
    errors = {},
}) {
    const selectRef = useRef(null);

    useEffect(() => {
        // Sesuaikan tinggi berdasarkan konten
        if (selectRef.current) {
            selectRef.current.style.height = "auto";
            selectRef.current.style.height = `${selectRef.current.scrollHeight}px`;
        }
    }, [formData[name]]); // Ulangi saat value berubah

    return (
        <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                {label}
            </legend>
            <select
                name={name}
                ref={selectRef}
                disabled={disabled}
                className="select w-full whitespace-normal leading-tight bg-gray-100"
                value={formData[name].id}
                onChange={(e) => setFormData(name, e.target.value)}
            >
                <option disabled value="">
                    Pilih {label}
                </option>
                {data.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item[label.toLowerCase()] ||
                            item.nama ||
                            item.keterangan ||
                            item.label ||
                            JSON.stringify(item)}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <p className="text-error text-xs mt-1">{errors[name]}</p>
            )}
        </fieldset>
    );
}
