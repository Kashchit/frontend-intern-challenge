import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TaskChartProps {
    completed: number;
    pending: number;
}

const COLORS = ['#22c55e', '#f59e0b'];

const TaskChart = ({ completed, pending }: TaskChartProps) => {
    const data = [
        { name: 'Completed', value: completed },
        { name: 'Pending', value: pending },
    ];

    return (
        <div className="h-64 rounded-lg bg-white p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TaskChart;