import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useResume } from "@/contexts/ResumeContext";
import { templateConfigs } from "@/config/templateConfig";
import { TemplateColors } from "@/types";
import { HexColorPicker } from "react-colorful";

interface TemplateCustomizerProps {
  onColorChange?: (colors: TemplateColors) => void;
  onChange?: (colors: TemplateColors) => void;
  colors?: TemplateColors;
}

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({ onColorChange, onChange, colors: initialColors }) => {
  const { activeTemplate } = useResume();
  const [selectedColor, setSelectedColor] = React.useState<string>("primary");
  const [customColors, setCustomColors] = React.useState<TemplateColors>(
    initialColors || templateConfigs[activeTemplate]
  );

  const handleColorChange = (color: string) => {
    const updatedColors = {
      ...customColors,
      [selectedColor]: color
    };
    setCustomColors(updatedColors);
    
    // Support both callback props
    if (onColorChange) onColorChange(updatedColors);
    if (onChange) onChange(updatedColors);
  };

  const colorFields = [
    { name: "primary", label: "Primary Color" },
    { name: "secondary", label: "Secondary Color" },
    { name: "accent", label: "Accent Color" },
    { name: "background", label: "Background Color" },
    { name: "text", label: "Text Color" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Template Colors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {colorFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: customColors[field.name as keyof TemplateColors] }}
                  />
                  <Input
                    value={customColors[field.name as keyof TemplateColors]}
                    onChange={(e) => handleColorChange(e.target.value)}
                    onClick={() => setSelectedColor(field.name)}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-4">
            <Label className="mb-2 block">Color Picker</Label>
            <HexColorPicker
              color={customColors[selectedColor as keyof TemplateColors]}
              onChange={handleColorChange}
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {colorFields.map((field) => (
              <button
                key={field.name}
                onClick={() => setSelectedColor(field.name)}
                className={`p-2 rounded-lg text-sm ${
                  selectedColor === field.name
                    ? "ring-2 ring-primary"
                    : "hover:bg-muted"
                }`}
              >
                <div
                  className="w-full h-8 rounded-md mb-1"
                  style={{ backgroundColor: customColors[field.name as keyof TemplateColors] }}
                />
                {field.label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCustomizer; 