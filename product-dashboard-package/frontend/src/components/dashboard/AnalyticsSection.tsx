import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface AnalyticsSectionProps {
  categoryData: CategoryData[];
}

const AnalyticsSection = ({ categoryData }: AnalyticsSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Category Distribution</h2>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-4">
        {categoryData.map((category) => (
          <div key={category.name}>
            <div className="flex justify-between mb-1">
              <span className="font-medium">{category.name}</span>
              <span>{category.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${category.percentage}%`,
                  backgroundColor: category.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSection;
