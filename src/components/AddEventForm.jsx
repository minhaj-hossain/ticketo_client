'use client'

import {
  Button,
  Card,
  CardHeader,
  Form,
  Input,
  ListBox,
  ListBoxItem,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
  TextArea,
  Select,
} from "@heroui/react";

const AddEventForm = () => {
  const CATEGORIES = [
    "Music",
    "Tech",
    "Sports",
    "Arts",
    "Business",
    "Food",
    "Other",
  ];
  const LOCATIONS = [
    "New York",
    "San Francisco",
    "London",
    "Dhaka",
    "Tokyo",
    "Berlin",
    "Online",
  ];

  // Added: Event handler to extract and console values via e.target elements
  const handleSubmit = (e) => {
    e.preventDefault();

    const elements = e.target.elements;
    const data = {
      title: elements.title.value,
      bannerUrl: elements.bannerUrl.value,
      category: elements.category.value,
      location: elements.location.value,
      date: elements.date.value,
      price: elements.price.value,
      seats: elements.seats.value,
      description: elements.description.value,
    };

    console.log("Event Form Data Submitted:", data);
  };

  return (
    <div className="mt-6 max-w-full">
      <Card
        className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
        radius="lg"
      >
        <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
          <h3 className="text-xl font-bold text-white">Host a New Event</h3>
          <p className="text-slate-400 text-xs">
            Fill out the detailed event information. Banners and dates are
            required.
          </p>
        </CardHeader>
        <div className="p-6">
          {/* Added: onSubmit listener */}
          <Form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Added: name="title" */}
              <Input
                label="Event Title"
                name="title"
                labelPlacement="outside"
                placeholder="e.g. Rock Fest 2026"
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
              />
              {/* Added: name="bannerUrl" */}
              <Input
                label="Banner Image URL"
                name="bannerUrl"
                labelPlacement="outside"
                placeholder="https://images.unsplash.com/..."
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                {/* Added: name="category" */}
                <Select
                  id="event-category"
                  name="category"
                  aria-label="Category"
                  placeholder="Select Category"
                  className="w-full"
                >
                  <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                    <SelectValue />
                    <SelectIndicator />
                  </SelectTrigger>
                  <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-50">
                    <ListBox className="outline-none">
                      {CATEGORIES.map((cat) => (
                        <ListBoxItem
                          key={cat}
                          id={cat}
                          textValue={cat}
                          className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                        >
                          {cat}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </SelectPopover>
                </Select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {/* Added: name="location" */}
                <Select
                  id="event-location"
                  name="location"
                  aria-label="Location"
                  placeholder="Select Location"
                  className="w-full"
                >
                  <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                    <SelectValue />
                    <SelectIndicator />
                  </SelectTrigger>
                  <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-50">
                    <ListBox className="outline-none">
                      {LOCATIONS.map((loc) => (
                        <ListBoxItem
                          key={loc}
                          id={loc}
                          textValue={loc}
                          className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                        >
                          {loc}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </SelectPopover>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                {/* Added: name="date" */}
                <Input
                  id="event-date"
                  name="date"
                  type="date"
                  label="Date"
                  labelPlacement="outside"
                  required
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {/* Added: name="price" */}
                <Input
                  id="event-price"
                  name="price"
                  type="number"
                  min={0}
                  step="any"
                  label="Ticket Price ($)"
                  labelPlacement="outside"
                  placeholder="0.00"
                  required
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {/* Added: name="seats" */}
                <Input
                  id="event-seats"
                  name="seats"
                  type="number"
                  min={1}
                  label="Available Capacity"
                  labelPlacement="outside"
                  placeholder="100"
                  required
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              {/* Added: name="description" */}
              <TextArea
                id="event-desc"
                name="description"
                label="Detailed Description"
                labelPlacement="outside"
                placeholder="Outline the detailed schedule, speaker list, and amenities..."
                required
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-30 text-white text-sm"
              />
            </div>
            <Button
              type="submit"
              className="bg-linear-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
              radius="lg"
            >
              Host Event Now
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AddEventForm;
