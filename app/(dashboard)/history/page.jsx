import getUserByClerkId from "@/utils/auth";
import Chart from "@/components/Chart";

async function getData() {
    const user = await getUserByClerkId();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy:{
            createdAt: 'asc'
        }
    })

    const sum = analyses.reduce((acc, crt) => acc + crt.sentimentScore, 0);
    const avg = Math.round(sum / analyses.length);
    return {analyses, avg};
}

export default async function History() {
    const {analyses, avg} = await getData();

    return (
        <div className='w-full h-full'>
            <div>{`Average sentiment: ${avg}`}</div>
            <div className='w-full h-full'>
                <Chart data={analyses}/>
            </div>
        </div>
    )
}
