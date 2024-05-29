import React from "react";

type Props = {
    subscriptionId: number;
};

function index({ subscriptionId }: Props) {
    return <div>index {subscriptionId}</div>;
}

export default index;
