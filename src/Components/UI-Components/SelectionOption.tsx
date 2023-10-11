import { useState } from "react";
import { withSops } from "../../HOC/withProvider";

interface SectionSelectProps {
    list: string[];
    disabled?: boolean[];
    setSopStatus: (item: string) => void;
    sopStatus:string
}

const SectionSelect: React.FC<SectionSelectProps> = ({
    list,
    disabled = [],
    setSopStatus,
    sopStatus
}) => {
    const [selected, setSelected] = useState(0);

    const basis = 100 / list.length;
    const left = selected * basis;

    const onClick = (item: string, i:number) => {
        setSopStatus(item);

        setSelected(i);
    };

    return (
        <>
            <div className={`flex justify-center relative `}>
                {list.map((x, i) => (
                    <button
                        key={i}
                        disabled={disabled[i]}
                        style={{ flexBasis: `${basis}%` }}
                        className={`text-md sm:text-sm py-4 transition-color duration-300 disabled:text-[#bbb] ` + (x === 'PENDING' ? 'text-red-500' : x === 'COMPLETED' ? 'text-green-500' : '')}
                        onClick={() => onClick(x, i)}
                    >
                        {x}
                    </button>
                ))}
            </div>

            <div className="flex items-center relative">
                <span className="absolute inline-block bg-[#CECECE] w-full h-1 rounded-full" />
                <span
                    style={{ width: `${basis}%`, marginLeft: `${left}%` }}
                    className={ "absolute inline-block h-1 transition-all duration-300 "+( sopStatus === "PENDING" ? " bg-red-500 " : sopStatus==="COMPLETED" ? " bg-green-500 "  : " bg-black " ) }
                />
            </div>
        </>
    );
};

export default withSops(SectionSelect);
