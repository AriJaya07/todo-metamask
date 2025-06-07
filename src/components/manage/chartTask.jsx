// Chart.js imports
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartTask({ filterData }) {
    const chartData = useMemo(() => {
        const allCount = filterData.length;
        const activeCount = filterData.filter((item) => item.status === "active").length;
        const completedCount = filterData.filter((item) => item.status === "completed").length;

        return {
            labels: ["All Tasks", "Active Tasks", "Completed Tasks"],
            datasets: [
                {
                    label: "Task Status Count",
                    data: [allCount, activeCount, completedCount],
                    backgroundColor: [
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                    ],
                    borderColor: [
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [filterData]);

    // Chart options (optional)
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="flex justify-center items-center p-5 bg-white rounded-lg shadow-md mb-5">
            <div className="flex items-center justify-center md:w-1/3 w-full">
                <Pie data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}