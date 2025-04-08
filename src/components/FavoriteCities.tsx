
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Trash2 } from 'lucide-react';

type FavoriteCitiesProps = {
  cities: string[];
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
};

const FavoriteCities: React.FC<FavoriteCitiesProps> = ({
  cities,
  onSelect,
  onRemove,
}) => {
  if (cities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" />
            Favorite Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Add cities to your favorites for quick access
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-400" />
          Favorite Cities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <div key={city} className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
                onClick={() => onSelect(city)}
              >
                {city}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => onRemove(city)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCities;
