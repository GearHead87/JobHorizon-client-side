import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyJobs = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: jobs = [], isLoading, refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-jobs/${user.email}`)
            return data;
        }
    })

    if (isLoading) {
        return <div className='text-center my-12'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(() => {
            axiosSecure.delete(`/job/${id}`)
                .then(res => {
                    console.log(res);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                    refetch();
                })
                .catch(err => {
                    console.log(err);
                })

        });


    }

    return (
        <div>
            <div className="overflow-x-auto max-w-5xl mx-auto">
                <table
                    className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
                >
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Job Title</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Job Posting Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Application Deadline</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Salary range
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Action
                            </th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            jobs.map(job => (
                                <tr key={job._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                        {job.jobTitle}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{new Date(job.jobPostingDate).toLocaleDateString()}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{new Date(job.applicationDeadline).toLocaleDateString()}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">${job.salaryRange}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <Link
                                            to={`/update-job/${job._id}`}
                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(job._id)}
                                            className="inline-block rounded bg-red-600 px-4 ml-4 py-2 text-xs font-medium text-white hover:bg-red-700">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyJobs;