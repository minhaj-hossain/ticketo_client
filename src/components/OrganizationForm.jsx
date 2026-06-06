"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Card, CardHeader, Form, Input, TextArea } from "@heroui/react";

const OrganizationForm = () => {
  const { data: session, isPending } = authClient.useSession();
  //   const user = session;
  //   console.log(session);

  // Added: Event handler to extract and console values via e.target
  const handleSubmit = (e) => {
    e.preventDefault();

    const elements = e.target.elements;
    const data = {
      organizationName: elements.organizationName.value,
      organizationLogo: elements.organizationLogo.value,
      organizationWebsite: elements.organizationWebsite.value,
      organizationDescription: elements.organizationDescription.value,
      organizerId: session?.user?.id,
    };

    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="mt-6 space-y-6 max-w-full">
      {/* Added: onSubmit listener */}
      <Card
        className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
        radius="lg"
      >
        <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
          <h3 className="text-xl font-bold text-white">Organization Details</h3>
          <p className="text-slate-400 text-xs">
            Review and edit your organization credentials.
          </p>
        </CardHeader>
        <div className="p-6">
          <Form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Added: name="organizationName" */}
            <Input
              id="organizationName"
              name="organizationName"
              label="Organization Name"
              labelPlacement="outside"
              placeholder="TechEvents Corp"
              required
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
            />

            {/* Added: name="organizationLogo" */}
            <Input
              id="organizationLogo"
              name="organizationLogo"
              label="Organization Logo"
              labelPlacement="outside"
              placeholder="https://images.unsplash.com/photo-1549880181-56a44cf8a4a1"
              required
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
            />

            {/* Added: name="organizationWebsite" */}
            <Input
              id="organizationWebsite"
              name="organizationWebsite"
              label="Organization Website"
              labelPlacement="outside"
              placeholder="techevents.corp"
              required
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
            />

            {/* Added: name="organizationDescription" */}
            <TextArea
              id="org-desc"
              name="organizationDescription"
              label="Description"
              labelPlacement="outside"
              placeholder="Hosting global developer conferences and software hacking marathons."
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-25 text-white text-sm"
            />

            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg"
                radius="lg"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default OrganizationForm;
