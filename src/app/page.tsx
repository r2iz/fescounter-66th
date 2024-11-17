"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const festivalDate = new Date("2025-04-26T09:30:00").getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = festivalDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
            setIsLoading(false);

            if (difference < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-blue-600">
                        残された時間
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-4 gap-4 text-center">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-4xl font-bold text-blue-500">
                                        {timeLeft.days}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        日
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-4xl font-bold text-blue-500">
                                        {timeLeft.hours}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        時間
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-4xl font-bold text-blue-500">
                                        {timeLeft.minutes}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        分
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-4xl font-bold text-blue-500">
                                        {timeLeft.seconds}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        秒
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
