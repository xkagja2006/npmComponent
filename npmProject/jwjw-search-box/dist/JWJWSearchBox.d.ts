import { AxiosInstance } from "axios";
type props = {
    buttonFlag?: boolean;
    containerClassName?: string;
    baseApi: AxiosInstance;
    getFlag: boolean;
    url: string;
    result: (data: unknown) => void;
    fail?: (data: unknown) => void;
    noDataText?: string;
};
declare const JWJWSearchBox: (props: props) => import("react/jsx-runtime").JSX.Element;
export default JWJWSearchBox;
