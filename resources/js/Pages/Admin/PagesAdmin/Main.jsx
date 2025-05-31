import DashboardAdmin from "../DashboardAdmin";

const Main = () => {
    return (
        <DashboardAdmin>
            <div className="flex-col">
                <div className="h-96 overflow-x-auto">
                    <table className="table table-pin-rows">
                        <thead>
                            <tr>
                                <th>A</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ant-Man</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardAdmin>
    );
};

export default Main;
