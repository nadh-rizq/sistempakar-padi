import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../ComponentAdmin/Modal";
import { useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import FlashMixin from "@/Pages/ComponentWeb/flashmixin";

const UserPages = ({ user, dataRole, flash }) => {
    useEffect(() => {
        if (flash?.success) {
            FlashMixin.fire({
                icon: "success",
                title: flash.success,
            });
        }

        if (flash?.error) {
            FlashMixin.fire({
                icon: "error",
                title: flash.error,
            });
        }
    }, [flash]);

    const [storeModalOpen, setStoreModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const addForm = useForm({
        name: "",
        email: "",
        password: "",
        kodeRole: "",
    });

    const updateForm = useForm({
        id: "",
        name: "",
        email: "",
        kodeRole: "",
    });

    const handleUpdateChange = (user) => {
        updateForm.setData({
            id: user.id,
            name: user.name,
            email: user.email,
            kodeRole: user.kodeRole,
        });
        setUpdateModalOpen(true);
    };

    const [localErrors, setLocalErrors] = useState({});

    const validateAddForm = () => {
        const newErrors = {};

        if (!addForm.data.name.trim()) {
            newErrors.name = "*username wajib diisi.";
        }

        if (!addForm.data.email.trim()) {
            newErrors.email = "email wajib diisi.";
        } else if (!/\S+@\S+\.\S+/.test(addForm.data.email)) {
            newErrors.email = "format email tidak valid.";
        } else {
            // Cek email duplicate di sini
            const isDuplicate = user.some(
                (u) =>
                    u.email.toLowerCase() === addForm.data.email.toLowerCase()
            );
            if (isDuplicate) {
                newErrors.email = "email sudah terdaftar!";
            }
        }

        if (!addForm.data.password) {
            newErrors.password = "password wajib diisi.";
        } else if (addForm.data.password.length < 8) {
            newErrors.password = "password minimal 8 karakter.";
        }

        if (!addForm.data.kodeRole.trim()) {
            newErrors.kodeRole = "role tidak boleh kosong.";
        }

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateUpdateForm = () => {
        const newErrors = {};

        const trimmedEmail = updateForm.data.email.trim();

        if (!updateForm.data.name.trim()) {
            newErrors.name = "username wajib diisi.";
        }

        if (!trimmedEmail) {
            newErrors.email = "email wajib diisi.";
        } else if (!/\S+@\S+\.\S+/.test(updateForm.data.email)) {
            newErrors.email = "format email tidak valid.";
        } else {
            const emailDipakai = user.some(
                (u) => u.email === trimmedEmail && u.id !== updateForm.data.id
            );
            if (emailDipakai) {
                newErrors.email = "email sudah digunakan oleh user lain.";
            }
        }

        if (!updateForm.data.kodeRole.trim()) {
            newErrors.kodeRole = "role tidak boleh kosong.";
        }

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        addForm.setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateAddForm()) return;

        addForm.post(`/list-user`, {
            onSuccess: () => {
                setStoreModalOpen(false);
                addForm.reset();
            },
            onError: (errors) => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: errors,
                    confirmButtonColor: "#F47C7C",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!validateUpdateForm()) return;

        updateForm.put(`/list-user/${updateForm.data.id}`, {
            onSuccess: () => {
                setUpdateModalOpen(false);
                updateForm.reset();
            },
            onError: (errors) => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: errors,
                    confirmButtonColor: "#F47C7C",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F47C7C",
            cancelButtonColor: "#43766C",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
            showLoaderOnConfirm: true, // Tampilkan loading di tombol konfirmasi
            preConfirm: () => {
                return new Promise((resolve, reject) => {
                    router.delete(`/list-user/${id}`, {
                        onSuccess: () => {
                            resolve();
                        },
                        onError: () => {
                            reject();
                            Swal.fire(
                                "Gagal!",
                                "Terjadi kesalahan saat menghapus data.",
                                "error"
                            );
                        },
                    });
                });
            },
            allowOutsideClick: () => !Swal.isLoading(), // Tidak bisa klik di luar saat loading
        });
    };

    return (
        <>
            <div className="py-2 w-full">
                <div className=" min-h-[50px] bg-gray-50 rounded-md text-green flex justify-between items-center mr-2">
                    <div className="card-title mx-5">Akun Pengguna</div>
                    <button
                        className="mx-5 btn btn-primary btn-sm"
                        onClick={() => {
                            setStoreModalOpen(true);
                        }}
                    >
                        + Tambah Data
                    </button>
                </div>
            </div>

            <Modal
                isOpen={storeModalOpen}
                title="Tambah Akun Baru!"
                onSend={handleSubmit}
                onClose={() => {
                    setStoreModalOpen(false);
                    addForm.reset();
                    setLocalErrors({});
                }}
                processing={addForm.processing}
            >
                <div className="fieldset">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Username
                    </legend>
                    <input
                        type="text"
                        name="name"
                        value={addForm.data.name}
                        onChange={handleChange}
                        className="input input-primary border-none bg-gray-100 w-full"
                        placeholder="username"
                        required
                    />
                    {localErrors.name && (
                        <p className="text-error text-xs mt-1">
                            {localErrors.name}
                        </p>
                    )}
                </div>
                <div className="fieldset mt-2">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Email
                    </legend>
                    <input
                        type="email"
                        name="email"
                        value={addForm.data.email}
                        onChange={handleChange}
                        className="input input-primary border-none bg-gray-100 w-full"
                        placeholder="email"
                        required
                    />
                    {localErrors.email && (
                        <p className="text-error text-xs mt-1">
                            {localErrors.email}
                        </p>
                    )}
                </div>
                <div className="fieldset mt-2">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Default Password
                    </legend>
                    <input
                        type="password"
                        name="password"
                        value={updateForm.data.password}
                        onChange={handleChange}
                        className="input input-primary border-none bg-gray-100 w-full"
                        placeholder="password"
                        required
                    />
                    {localErrors.password && (
                        <p className="text-error text-xs mt-1">
                            {localErrors.password}
                        </p>
                    )}
                </div>
                <div className="fieldset mt-2">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px] mt-2">
                        Role
                    </legend>
                    <select
                        name="kodeRole"
                        className={`select w-full ${
                            addForm.data.kodeRole === "R0LE01"
                                ? "bg-error text-white font-bold"
                                : addForm.data.kodeRole === "R0LE02"
                                ? "bg-yellow-500 text-white font-bold"
                                : addForm.data.kodeRole === "R0LE03"
                                ? "bg-success text-white font-bold"
                                : "bg-gray-100 text-gray-300 font-semibold text-sm"
                        }`}
                        value={addForm.data.kodeRole}
                        onChange={handleChange}
                    >
                        <option className="bg-gray-100 hidden">
                            pilih role
                        </option>
                        {dataRole
                            ? dataRole.map((role) => (
                                  <option
                                      className="bg-gray-100 text-gray-500"
                                      key={role.kodeRole}
                                      value={role.kodeRole}
                                  >
                                      {role.role.charAt(0).toUpperCase() +
                                          role.role.slice(1)}
                                  </option>
                              ))
                            : ""}
                    </select>

                    {localErrors.kodeRole && (
                        <p className="text-error text-xs mt-1">
                            {localErrors.kodeRole}
                        </p>
                    )}
                </div>
            </Modal>

            {updateModalOpen && (
                <Modal
                    isOpen={updateModalOpen}
                    title="Ubah Informasi Akun!"
                    onSend={handleUpdate}
                    onClose={() => {
                        setUpdateModalOpen(false);
                        updateForm.reset();
                        setLocalErrors({});
                    }}
                    processing={updateForm.processing}
                >
                    <input
                        type="hidden"
                        name="id"
                        onChange={(e) =>
                            updateForm.setData("id", e.target.value)
                        }
                    />
                    <div className="fieldset">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Username
                        </legend>
                        <input
                            type="text"
                            name="name"
                            value={updateForm.data.name}
                            onChange={(e) =>
                                updateForm.setData("name", e.target.value)
                            }
                            className="input input-primary border-none bg-gray-100 w-full"
                            required
                        />
                        {localErrors.name && (
                            <p className="text-error text-xs mt-1">
                                {localErrors.name}
                            </p>
                        )}
                    </div>
                    <div className="fieldset mt-2">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Email
                        </legend>
                        <input
                            type="email"
                            name="email"
                            value={updateForm.data.email}
                            onChange={(e) =>
                                updateForm.setData("email", e.target.value)
                            }
                            className="input input-primary border-none bg-gray-100 w-full"
                            required
                        />
                        {localErrors.email && (
                            <p className="text-error text-xs mt-1">
                                {localErrors.email}
                            </p>
                        )}
                    </div>

                    <div className="fieldset mt-2">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px] mt-2">
                            Role
                        </legend>
                        <select
                            name="kodeRole"
                            className={`select w-full font-bold ${
                                updateForm.data.kodeRole === "R0LE01"
                                    ? "bg-error text-white"
                                    : updateForm.data.kodeRole === "R0LE02"
                                    ? "bg-yellow-500 text-white"
                                    : updateForm.data.kodeRole === "R0LE03"
                                    ? "bg-success text-white"
                                    : "bg-gray-100 "
                            }`}
                            value={updateForm.data.kodeRole}
                            onChange={(e) =>
                                updateForm.setData("kodeRole", e.target.value)
                            }
                        >
                            <option className="bg-gray-100" disabled={true}>
                                Pilih Role
                            </option>
                            {dataRole
                                ? dataRole.map((role) => (
                                      <option
                                          className="bg-gray-100 text-black"
                                          key={role.kodeRole}
                                          value={role.kodeRole}
                                      >
                                          {role.role.charAt(0).toUpperCase() +
                                              role.role.slice(1)}
                                      </option>
                                  ))
                                : ""}
                        </select>

                        {localErrors.kodeRole && (
                            <p className="text-error text-xs mt-1">
                                {localErrors.kodeRole}
                            </p>
                        )}
                    </div>
                </Modal>
            )}

            <div className="w-full py-2">
                <div className="h-[calc(100vh-165px)] overflow-x-auto rounded-lg  ">
                    <table className="table table-pin-rows bg-gray-50">
                        <thead className="border-b-2 text-sm text-primary font-bold">
                            <tr>
                                <th>#</th>
                                <th>USERNAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th className="text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {user ? (
                                user.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>
                                                {data.kodeRole === "R0LE01" ? (
                                                    <div className="badge badge-error font-bold text-white">
                                                        Admin
                                                    </div>
                                                ) : data.kodeRole ===
                                                  "R0LE02" ? (
                                                    <div className="badge bg-yellow-500 font-bold text-white">
                                                        Expert
                                                    </div>
                                                ) : data.kodeRole ===
                                                  "R0LE03" ? (
                                                    <div className="badge badge-success font-bold text-white">
                                                        User
                                                    </div>
                                                ) : (
                                                    "badge-ghost"
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        className="btn btn-xs text-primary btn-circle"
                                                        onClick={() =>
                                                            handleUpdateChange(
                                                                data
                                                            )
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn btn-xs text-primary btn-circle"
                                                        onClick={() =>
                                                            handleDelete(
                                                                data.id
                                                            )
                                                        }
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr className="text-center">
                                    <td colSpan={5}>
                                        <i>~ belum ada data ~</i>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserPages;
