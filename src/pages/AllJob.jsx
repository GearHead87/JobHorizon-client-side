import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const AllJob = () => {
    const axiosSecure = useAxiosSecure();
    const { data: jobs = [], isLoading, isError, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/jobs')
            return data;
        }
    })
    const {
        jobBannerUrl,
        jobTitle,
        userName,
        userEmail,
        jobCategory,
        salaryRange,
        jobDescription,
        jobPostingDate,
        applicationDeadline,
        jobApplicantsNumber,
    } = jobs
    console.log()
    if (isLoading) {
        return <div className='text-center my-12'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
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
                                            to={`/job/${job._id}`}
                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            View Details
                                        </Link>
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

export default AllJob;