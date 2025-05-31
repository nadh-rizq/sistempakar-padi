import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-green">
                <strong>Forgot your password?</strong> No problem. Just let us
                know your email address and we will email you a password reset
                link that will allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={onHandleChange}
                /> */}
                <input
                    type="email"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    id="email"
                    name="email"
                    value={data.email}
                    isFocused={true}
                    onChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <button
                        className="btn btn-active btn-sm rounded-md ml-4 text-cream"
                        disabled={processing}
                    >
                        EMAIL PASSWORD RESET LINK
                    </button>
                    {/* <PrimaryButton className="ml-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton> */}
                </div>
            </form>
        </GuestLayout>
    );
}
