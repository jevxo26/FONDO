import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";


export interface UploadImageResponse {
    success: boolean;
    message: string;
    data: {
        url: string;
    };
}

export const uploadApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<UploadImageResponse, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append("image", file);

                return {
                    url: "/upload/image",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),

    overrideExisting: true,
});

export const {
    useUploadImageMutation,
} = uploadApi;

export function useUploadImage() {
    const [trigger, { isLoading }] = useUploadImageMutation();

    return {
        ...createMutationWrapper(trigger),
        isLoading,
    };
}