import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { URL } from "../config";
import { fetchData } from "../helper";

const useGetReportedPosts = () => {
    return useQuery({
        queryKey: ["reportedPosts"],
        queryFn: () =>
            fetchData({
                url: URL + "users/getReportPost",
                isAuthRequired: true,
            }),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};


const useGetAllUsers = (page, limit) => {
    return useQuery({
        queryKey: ["allUsers", page, limit],
        queryFn: ({queryKey}) =>
          { 
            return fetchData({
                url: URL + "users/getAllUser",
                isAuthRequired: true,
                method: "POST"
            },
            { data: [{ pageNumber: queryKey[1], pageLimit: queryKey[2] }] })},
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
        keepPreviousData: true,
    });
};

const useGetAllSchedules = () => {
    return useQuery({
        queryKey: ["allSchedules"],
        queryFn: () =>
        fetchData({
                url: URL + "schedule/getAllSchedule",
                isAuthRequired: true,
            }),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        }
    });
};

const useGetAllUnverifiedPages = () => {
    return useQuery({
        queryKey: ["unverifiedPages"],
        queryFn: () =>
        fetchData({
                url: URL + "pages/getAllUnverifiedPages",
                isAuthRequired: true,
            }),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        }
    });
};

const useDeletePost = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "users/deleteReportedPost",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            onSuccessFunctions()
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ["reportedPosts"] });
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useVerifyPage = (onSuccessFunctions) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchData(
                {
                    url: URL + "pages/verifiyCompanyPages",
                    method: "POST",
                    isAuthRequired: true,
                },
                { data: [data] }
            ),
        onSuccess: (data) => {
            console.log(data,"data")
            queryClient.invalidateQueries({ queryKey: ["unverifiedPages"] });
            toast.success(data)
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};


export { useDeletePost, useGetReportedPosts, useGetAllUsers, useGetAllSchedules, useGetAllUnverifiedPages, useVerifyPage };
