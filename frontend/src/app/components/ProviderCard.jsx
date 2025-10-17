import {MapPin , Briefcase , Star} from 'lucide-react'
const ProviderCard = ({ provider }) => {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group flex flex-col">
            <div className="relative">
                <img src={provider.banner} alt={`${provider.name}'s work`} className="h-36 w-full object-cover"/>
                <img src={provider.img} alt={provider.name} className="absolute bottom-0 left-4 transform translate-y-1/2 w-16 h-16 rounded-full border-4 border-gray-800 group-hover:border-indigo-500 transition-colors" />
            </div>
            <div className="pt-10 px-4 pb-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-sm font-bold text-white">{provider.name}</h3>
                        <p className="text-indigo-400 text-xs font-medium">{provider.service}</p>
                    </div>
                     <div className="flex items-center bg-gray-700/50 text-yellow-400 px-2 py-0.5 rounded-full text-xs font-semibold mt-1 flex-shrink-0">
                        <Star className="w-3 h-3 mr-1" fill="currentColor" />
                        <span>{provider.rating}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center text-gray-400 text-xs mt-3 border-t border-gray-700 pt-3">
                    <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center">
                        <Briefcase className="w-3 h-3 mr-1" />
                        <span>{provider.projects} Projects</span>
                    </div>
                </div>
                <div className="mt-auto pt-4">
                     <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg text-xs transition-colors">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProviderCard;