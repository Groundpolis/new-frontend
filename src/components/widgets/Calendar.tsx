import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  float: left;
  width: 60%;
  text-align: center;

  &.isHoliday {
			> .day {
				color: var(--pink);
			}
		}
		> p {
			margin: 0;
			line-height: 18px;
			font-size: 0.9em;
			> span {
				margin: 0 4px;
			}
		}
		> .day {
			margin: 10px 0;
			line-height: 32px;
			font-size: 1.75em;
		}
  }
`;

const InfoContainer = styled.div`
  display: block;
  float: left;
  width: 40%;
  padding: 0 16px 0 0;
  box-sizing: border-box;
`;

const Info = styled.div`
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 4px;
  }
  > p {
    margin: 0 0 2px 0;
    font-size: 0.75em;
    line-height: 18px;
    opacity: 0.8;
    > b {
      margin-left: 2px;
    }
  }
`;

const Meter = styled.div`
  width: 100%;
  overflow: hidden;
  background: var(--tone-2);
  border-radius: 8px;
  > .val {
    height: 4px;
    transition: width .3s cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

const MeterValue = styled.div<{color: string}>`
  height: 4px;
  transition: width .3s cubic-bezier(0.23, 1, 0.32, 1);
  background: ${props => props.color};
`;

export default function Calendar() {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [weekDay, setWeekDay] = useState('');
  const [yearP, setYearP] = useState(0);
  const [dayP, setDayP] = useState(0);
  const [monthP, setMonthP] = useState(0);
  const [isHoliday, setHoliday] = useState(false);

  const tick = () => {
    const now = new Date();
    const [ny, nm, nd] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
    setYear(ny);
    setMonth(nm);
    setDay(nd);
    setWeekDay([
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
    ][now.getDay()]);
    const dayNumer   = now.getTime() - new Date(ny, nm - 1, nd).getTime();
    const dayDenom   = 1000/*ms*/ * 60/*s*/ * 60/*m*/ * 24/*h*/;
    const monthNumer = now.getTime() - new Date(ny, nm - 1, 1).getTime();
    const monthDenom = new Date(ny, nm, 1).getTime() - new Date(ny, nm - 1, 1).getTime();
    const yearNumer  = now.getTime() - new Date(ny, 0, 1).getTime();
    const yearDenom  = new Date(ny + 1, 0, 1).getTime() - new Date(ny, 0, 1).getTime();
    setDayP(dayNumer   / dayDenom   * 100);
    setMonthP(monthNumer / monthDenom * 100);
    setYearP(yearNumer  / yearDenom  * 100);
    setHoliday(now.getDay() === 0 || now.getDay() === 6);
  };

  useEffect(() => {
    tick();
    const clock = setInterval(tick, 1000);
    return () => clearInterval(clock);
  }, []);

  return (
    <div className="bg-panel rounded py-2 px-0 shadow-2">
      <CalendarContainer className={isHoliday ? 'isHoliday' : ''}>
        <p>
          <span>{year}年</span>
          <span>{month}月</span>
        </p>
        <p className="day">
          {day}日
        </p>
        <p>{weekDay}</p>
      </CalendarContainer>
      <InfoContainer className="vstack">
        <Info>
          <p>今日: <b>{dayP.toFixed(1)}%</b></p>
          <Meter>
            <MeterValue style={{width: `${dayP}%`}} color="var(--pink)" />
          </Meter>
        </Info>
        <Info>
          <p>今月: <b>{monthP.toFixed(1)}%</b></p>
          <Meter>
            <MeterValue style={{width: `${monthP}%`}} color="var(--green)" />
          </Meter>
        </Info>
        <Info>
          <p>今年: <b>{yearP.toFixed(1)}%</b></p>
          <Meter>
            <MeterValue style={{width: `${yearP}%`}} color="var(--skyblue)" />
          </Meter>
        </Info>
      </InfoContainer>
    </div>
  );
}
