import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Rating from "./rating";
import ReviewCard from "./reviewcard";
import {useUser} from "../../../../../../context/user-context";
import {fetcherWithToken} from "@lib/config/SwrFetcherConfig";
import {getAllReviewsByUserId} from "../../../../../../services/main/clientRequest/userClient";
import {useParams} from "next/navigation";
import {Loading} from "@components/ui/loading";

interface ReviewComponentProps {
    id: string;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ id }) => {
    const { data: reviews, error } = useSWR(getAllReviewsByUserId(id),fetcherWithToken);
    console.log('Review',reviews?.data)
    return (
        <>
            <div className="review-component">
                {reviews?.data.length > 0 ? (
                    <Rating reviews={reviews?.data}/>
                ) : (
                    <Loading className='mt-5' />
                )}
            </div>
            <div className="container mx-auto p-4 space-y-4">
                {reviews?.data.map((review: any,index: number) => (
                    <div key={index}>
                        <ReviewCard key={review.id}  review={review}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ReviewComponent;