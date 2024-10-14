import { useCandlestickData, useColorMode } from '@/hooks';
import { PoolType } from '@/views/pool-views/types';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

interface CandleStickProps {
  activeTimeComponent: string;
  pool: PoolType;
  defaultToken: string;
}

const CandlestickChart: React.FC<CandleStickProps> = ({ activeTimeComponent, defaultToken }) => {
  // Use the custom hook to fetch data
  const { data, loading } = useCandlestickData(defaultToken, activeTimeComponent);

  const { color } = useColorMode();

  console.log(color);

  const [series, setSeries] = useState([
    {
      name: 'Candlestick',
      type: 'candlestick',
      data: []
    }
  ]);

  useEffect(() => {
    if (data) {
      const formattedData = data.map(({ timestamp, open, high, low, close }) => ({
        x: new Date(timestamp),
        y: [open, high, low, close]
      }));
      setSeries([
        {
          name: 'Candlestick',
          type: 'candlestick',
          data: formattedData
        }
      ]);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '0.875rem', // equivalent to text-sm in Tailwind
          colors: ['#fff'],
          fontFamily: 'inherit'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Price',
          style: {
            fontSize: '0.875rem', // equivalent to text-sm in Tailwind
            colors: ['#fff'],
            fontFamily: 'inherit'
          }
        },
        labels: {
          style: {
            fontSize: '0.875rem', // equivalent to text-sm in Tailwind
            colors: ['#fff'],
            fontFamily: 'inherit'
          }
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      labels: {
        style: {
          fontSize: '0.875rem', // equivalent to text-sm in Tailwind
          colors: ['#333'],
          fontFamily: 'inherit'
        }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00C851',
          downward: '#ff4444'
        },
      }
    }
  };

  return (
    <div className='chart-container'>
      <h4 className='text-xl sm:text-2xl lg:text-3xl dark:text-white text-gray-600 mx-3'>{defaultToken}</h4>
      <Chart
        options={options}
        series={series}
        type="candlestick"
      />
    </div>
  );
};

export default CandlestickChart;
