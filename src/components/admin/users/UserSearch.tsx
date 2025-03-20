
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";

interface UserSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="ค้นหาผู้ใช้..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {searchTerm && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onSearchChange("")}
          className="ml-2"
        >
          <FilterX className="h-4 w-4 mr-1" />
          ล้างตัวกรอง
        </Button>
      )}
    </div>
  );
};

export default UserSearch;
