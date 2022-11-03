import { Suspense } from "react";
import { formatNumber } from "../../util";
import ClickMe from "../../components/suspense/ClickMe";
import { TimelineBodyLoading, TimelineBody } from "../../components/suspense/TimelineBody";

export type LoadingDuration = {
    index: number;
    resolveDuration: number;
};

function makePromises(n: number) {
    return [...Array(n)].map((_, index) => {
        return new Promise<LoadingDuration>((resolve, reject) => {
            const resolveDuration = Math.random() * 10000;
            const shouldReject = Math.random() > 0.7;
            setTimeout(() => {
                if (shouldReject) {
                    reject(new Error(`Promise ${index} failed to resolve after ${formatNumber(resolveDuration)}`));
                } else {
                    resolve({ index, resolveDuration });
                }
            }, resolveDuration);
        });
    });
}

export default function AwaitSuspense() {
    const promises = makePromises(10);

    return (
        <div>
            <h1>Suspense</h1>
            <div className="mt-2">
                <ClickMe />
            </div>
            <div className="mt-3">
                {promises.map((promise, i) => (
                    <div key={i} className="TimelineItem">
                        <Suspense fallback={<TimelineBodyLoading />}>
                            <TimelineBody promise={promise} />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
}
