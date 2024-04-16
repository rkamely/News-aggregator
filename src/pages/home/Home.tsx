import {getNewsTheGuardian, getSectionsTheGuardian} from "../../apis/apis.ts";
import {useInfiniteQuery, useQuery} from 'react-query';
import {useState} from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import {debounce} from "../../utils.ts";
import {useNavigate} from 'react-router-dom';
import LoadMoreButton from "../../components/buttons/LoadMoreButton.tsx";
import SubTitle from "../../components/titles/SubTitle.tsx";
import Caption from "../../components/titles/Caption.tsx";
import {IoIosHeart} from "react-icons/io";
import {IResponseItem} from "../../types/types.ts";


type DateRange = [
    startDate: Date | null,
    endDate: Date | null
]


export interface ISections {
    value: string;
    label: string;
}


const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedOption, setSelectedOption] = useState<ISections>({value: "", label: "All Categories"});
    const [dateRange, setDateRange] = useState<DateRange>([null, null]);
    const [startDate, endDate] = dateRange;

    const {data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage,} = useInfiniteQuery(
        ["getNewsTheGuardian", selectedOption, searchTerm, endDate],
        ({pageParam = 1}) => getNewsTheGuardian(pageParam, selectedOption, searchTerm, startDate, endDate), {
            getNextPageParam: (lastPage) => lastPage?.data?.response?.currentPage + 1,

        }
    );

    const {data: sectionData} = useQuery(
        "getSectionsTheGuardian",
        getSectionsTheGuardian,
    );


    const options: ISections[] = [
        {value: "", label: "All Categories"},
        ...(sectionData?.data?.response?.results?.map((item: { id: string; webTitle: string; }) => ({
            value: item?.id,
            label: item?.webTitle,
        })) || []),
    ];
    const handleChange = (option: ISections | null): void => {
        if (option) {
            setSelectedOption(option);

        }
    };


    const handleSearchChange = debounce<string>((value: string) => {
        setSearchTerm(value);

    }, 1000);

    const handlePostNavigate = (itemURL: string, itemId: string | null | undefined) => {
        if (itemId) {
            navigate(`/post/${itemURL}`, {state: {itemId}});
        }
    };
    return (
        <div className={`w-full flex flex-col justify-center mb-10 max-w-[1440px] mx-auto`}>
            <div className={`w-full flex flex-col md:flex-row items-center justify-center gap-4 mb-4 bg-white p-5 `}>
                <a href={"#"}
                   className={`relative min-w-10 min-h-10 border border-solid p-2 rounded-full bg-black cursor-pointer group   `}>
                    <IoIosHeart
                        className={` text-white w-full h-full border-gray-500 hover:text-red-700 duration-300 hover:rotate-[360deg] `}/>
                    <h2
                        className={`absolute block bg-black text-white rounded-md top-0 left-10 text-nowrap group-hover:p-2
                         max-w-0 group-hover:max-w-80 duration-300 overflow-hidden font-bold `}>
                        Choose your Categories
                    </h2>
                </a>
                <input type="text"
                       className={`max-w-[400px] w-full h-10 outline-0 p-4 rounded-md border-2
                        border-gray-300 focus:border-[#2684FF]  duration-300`}
                       onChange={(e) => handleSearchChange(e.target.value)}
                       placeholder="Search..."/>
                <DatePicker
                    wrapperClassName={`max-w-[400px] w-full  `}
                    className={`w-full outline-0 h-10  p-4 rounded-md border-2 border-gray-300 focus:border-[#2684FF]  duration-300 `}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable={true}
                    placeholderText={"Choose date"}
                    dateFormat="yyyy-MM-dd"
                />

                <Select
                    className={`max-w-[400px] w-full h-10 outline-0 max-h-40 rounded-md duration-300`}
                    value={selectedOption}
                    onChange={(e: ISections | null) => handleChange(e)}
                    options={options}
                    isSearchable
                    placeholder={"Choose category"}
                />
            </div>

            {isLoading ? <div
                className={` absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  text-white text-2xl `}>Loading... </div> : <>
                <div
                    className={`p-10 gap-4 justify-between items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full sm:w-[80%] md:w-full mx-auto  `}>
                    {
                        data?.pages?.map(item => item?.data?.response?.results.length > 0 ? item?.data?.response?.results.map((item: IResponseItem) =>
                                <div
                                    className={`flex flex-col bg-white border-[1px] border-black rounded-md p-4 h-[500px] max-h-[500px]`}
                                    key={item?.id}>
                                    <img
                                        onClick={() => handlePostNavigate(item?.webTitle, item?.id)}
                                        src={item?.fields?.thumbnail} alt=""
                                        className={`self-center min-h-[60%] max-h-[60%] overflow-hidden object-cover cursor-pointer `}/>
                                    <SubTitle title={item?.webTitle} className={`text-gray-700 py-2 text-justify`}/>
                                    <div className={`overflow-hidden text-justify`}
                                         dangerouslySetInnerHTML={{__html: item?.fields?.trailText}}/>

                                    <div className={`text-gray-700 mt-auto flex justify-between items-center w-full`}>
                                        <Caption title={new Date(item?.webPublicationDate)?.toDateString()}/>
                                        <Caption title={item?.sectionName}
                                                 onClick={() => setSelectedOption({
                                                     value: item?.sectionId,
                                                     label: item?.sectionName
                                                 })}
                                                 className={`px-2 py-1 border border-gray-700 rounded-md cursor-pointer hover:bg-black hover:text-white duration-300`}
                                        />

                                    </div>
                                </div>
                            ) :
                            <SubTitle title={"There aren't any news in this category"}
                                      className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-red-700 bg-white p-10 rounded-md`}/>)
                    }
                </div>
                {(!!data?.pages[0]?.data?.response?.pages && data?.pages.length !== data?.pages[0]?.data?.response?.pages) &&
                    <LoadMoreButton onClick={() => fetchNextPage()} loading={isFetchingNextPage}
                                    disable={!hasNextPage || isFetchingNextPage} title={"Load more"}/>

                }

            </>}


        </div>
    )
        ;
};

export default Home;
