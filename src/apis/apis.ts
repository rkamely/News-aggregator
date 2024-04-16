import HttpService from "../config/http-service.ts";
import {DefaultServerResponse, news, singleItem} from "../types/types.ts";
import {ISections} from "../pages/home/Home.tsx";


function convertDate(dateString:Date) {
    // Create a Date object from the provided string
    const date = new Date(dateString);

    // Get the year, month (0-indexed), and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

    // Format the date in the desired format
    return `${year}-${month}-${day}`;
}

export const getNewsTheGuardian = (pageParam: number, section: ISections, searchTerm: string, startDate: Date|null, endDate: Date|null) => {
    return HttpService.get<DefaultServerResponse<news>>(
        ` https://content.guardianapis.com/search?${section?.value ? `section=${section?.value}&` : ""}${startDate ? `from-date=${convertDate(startDate)}&` : ""}${endDate ? `to-date=${convertDate(endDate)}&` : ""}${searchTerm ? `q=${searchTerm}&` : ""}show-fields=${["thumbnail", "trailText,body"]}&references=isbn&page=${pageParam}&api-key=263009cc-8ee0-46f7-9ec1-235195b471c2`
    );
};


export const getSingleItemNews = (id:string) => {
    return HttpService.get<DefaultServerResponse<singleItem>>(
        ` https://content.guardianapis.com/${id}?show-fields=${["all"]}&show-elements=${["image"]}&api-key=263009cc-8ee0-46f7-9ec1-235195b471c2`
    );
};

export const getSectionsTheGuardian = () => {
    return HttpService.get<DefaultServerResponse<any>>(
        " https://content.guardianapis.com/sections?api-key=263009cc-8ee0-46f7-9ec1-235195b471c2"
    );
};

export const getTagsTheGuardian = () => {
    return HttpService.get<DefaultServerResponse<any>>(
        " https://content.guardianapis.com/tags?api-key=263009cc-8ee0-46f7-9ec1-235195b471c2"
    );
};

