import { makeAssistantToolUI } from "@assistant-ui/react";

type WeatherArgs = {
    location: string;
};

type WeatherResult = {
    temperature: string;
};

export const WeatherToolUI = makeAssistantToolUI<WeatherArgs, WeatherResult>({
    toolName: "weather",
    render: () => {
        return <h1>Temp: 72 + Math.floor(Math.random() * 21) - 10</h1>;
    },
});