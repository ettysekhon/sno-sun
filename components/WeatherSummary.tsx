type WeatherSummaryProps = {
  temp: number;
  summary: string;
  location: string;
  sunrise: string;
  sunset: string;
};

export const WeatherSummary = ({
  temp,
  summary,
  location,
  sunrise,
  sunset,
}: WeatherSummaryProps): JSX.Element => (
  <section className="flex items-center justify-center flex-col">
    <div className="pt-8 text-3xl">
      <span>{location}</span>
    </div>
    <div className="pt-2 text-7xl">{`${temp}°`}</div>
    <div className="pt-2 text-xl pb-4 text-gray-500">{summary}</div>
    <div className="flex w-full justify-between border-gray-100 border-t-2">
      <div className="flex items-center justify-center p-4 w-full">
        <div className="flex items-center justify-center flex-col">
          <div>{sunrise}</div>
          <div className="text-xs text-gray-500">SUNRISE</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 w-full border-gray-100 border-l-2">
        <div className="flex items-center justify-center flex-col">
          <div>{sunset}</div>
          <div className="text-xs text-gray-500">SUNSET</div>
        </div>
      </div>
    </div>
  </section>
);
