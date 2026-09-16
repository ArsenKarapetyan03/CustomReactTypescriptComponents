import { useState } from "react";
import { CustomButton } from "./components/CustomButton.tsx";
import { CollapsiblePanel } from "./components/CollapsiblePanel.tsx";
import { CustomDropdown } from "./components/CustomDropdown.tsx";
import { EmptyState } from "./components/EmptyState.tsx";
import { CustomTabs } from "./components/CustomTabs.tsx";
import { CustomNotification } from "./components/CustomNotification.tsx";
import { CustomLoadingSpinner } from "./components/CustomLoadingSpinner.tsx";
import { CustomDrawer } from "./components/CustomDrawer.tsx";
import { CustomModal } from "./components/CustomModal.tsx";
import { CustomForm } from "./components/CustomForm.tsx";
import { PackageOpen } from "lucide-react";

function App() {

	const [openDrawer, setOpenDrawer] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className={"flex flex-col items-center gap-8"}>

			<div>
				<CustomButton onClick={() => setOpenDrawer(true)}>Default Button</CustomButton>
				<CustomButton variant={"primary"} onClick={()=>{}}>Primary Button</CustomButton>
				<CustomButton variant={"link"}>Link Button</CustomButton>
				<CustomButton
					size={"lg"}
					variant={"dashed"}
					animation={false}
					onClick={() => setOpenModal(true)}
				>
					Dashed Button
				</CustomButton>
				<CustomButton
					size={"sm"}
					variant={"text"}
				>
					Text Button
				</CustomButton>
			</div>

			<EmptyState />
			<EmptyState
				message={"There is no data found"}
				icon={PackageOpen}
				className={"flex flex-row gap-2"}
			/>

			<CustomDropdown
				title={"Dropdown menu"}
				trigger={"click"}
				// direction={"up"}
				menuItems={[
					{label: "1st item"},
					{
						label: "Button",
						anchorProps: {
							onClick: () => alert("Click menu"),
						}
					},
					{
						label: "Link",
						anchorProps: {
							href: "#",
						}
					},
					{
						label: "disabled item",
						disabled: true,
						anchorProps: {
							target: "_blank",
						},
					},
					{
						label: "danger item",
						danger: true,
					},
				]}
			/>

			<CollapsiblePanel
				defaultActivePanels={[1, 3]}
				accordion={true}
				size="lg"
				panels={
					[
						{title: "1 title", content: "lorem ipsum",},
						{title: "2 title", content: "lorem ipsum sit amet dolor sit amet",},
						{title: "3 title", content: "lorem ipsum sit amet dolor sit amet",},
						{title: "4 title", content: "lorem ipsum sit amet dolor sit amet",}
					]
				}
			/>

			<CustomTabs
				defaultActiveTab={3}
				size={"lg"}
				// centered={true}
				// variant={"card"}
				tabs={
					[
						{
							title: "Tab 1",
							content: "Tab 1 lorem ipsum dolor sit amet consectetur",
						},
						{
							title: "Tab 2",
							content: "Tab 2 lorem ipsum dolor sit amet consectetur"
						},
						{
							title: "Tab 3",
							content: "Tab 3 lorem ipsum dolor sit amet consectetur",
							disabled: true
						},
						{
							title: "Tab 4",
							content: (
								<div>
									<h2>Dummy text</h2>
									<p>
										Tab 4 lorem ipsum dolor sit amet consectetur
									</p>
								</div>
							)
						}
					]}
			/>

			<CustomNotification
				message={
					{
						title: "Info Message",
						content: "Hello World!",
					}
				}
				duration={2000}
			/>
			<CustomNotification
				message={
					{
						title: "Warning Message",
						content: "Hello World!",
					}
				}
				type="warning"
				position="top-left"
				autoClose={false}
			/>
			<CustomNotification
				message={
					{
						title: "Success Message",
						content: "Hello World!",
					}
				}
				type="success"
				position="bottom-left"
			/>
			<CustomNotification
				message={
					{
						title: "Hello",
						content: "Hello World!",
					}
				}
				type="error"
				position="bottom-right"
				duration={5000}
			/>

			<CustomLoadingSpinner
				size={"lg"}
				variant={"dashed"}
				description={"Please wait..."}
			/>
			<CustomLoadingSpinner
				size={"lg"}
				variant={"dots"}
				duration={10}
				description={"Please wait..."}
			/>
			<CustomLoadingSpinner
				size={"lg"}
				variant={"solid"}
				description={"Please wait..."}
			/>


			<div className="w-7.5 h-7.5 overflow-hidden">
				<CustomDrawer
					title={"Drawer title"}
					size={400}
					open={openDrawer}
					setOpen={setOpenDrawer}
					// placement="bottom"
				>
					<div className="flex-1 h-full overflow-y-auto p-4">
						Drawer content
					</div>
				</CustomDrawer>
			</div>

			<CustomModal
				size={"lg"}
				// variant={"alert"}
				modalOpen={openModal}
				setModalOpen={setOpenModal}
				content={{
					contentTitle: "Delete account",
					contentBody: (
						<div>
							<p>Are you sure?</p>
							<p className="mt-2 font-medium text-red-600">
								This action cannot be undone.
							</p>
							<div className={"flex justify-center gap-2"}>
								<CustomButton onClick={() => setOpenModal(false)}>Cancel</CustomButton>
								<CustomButton
									variant={"primary"}
									onClick={() => {
										setOpenModal(false);
										alert("Confirmed");
									}}
								>
									Confirm
								</CustomButton>
							</div>
						</div>
					),
				}}
			/>

			<CustomForm
				title={"Form title"}
				onSubmit={()=>alert("Submitted")}
				child={<div>My content...</div>}
				fields={
					[
						{
							name: "name",
							label: "Field 1",
							props: {
								autoComplete: "name",
								required: true,
							},
							validate: (value: string) => {
								if (!value) return "Username is required";
								if (value.length < 3) return "Must be at least 3 characters";
								if (value.toLowerCase() === "admin") return "Forbidden username";
								return undefined;
							}
						},
						{
							name: "email",
							label: "Email",
							props: {
								type: "email",
								autoComplete: "email",
								required: true
							}
						},
						{
							name: "password",
							label: "Password",
							props: {
								type: "password",
								autoComplete: "password",
								required: true
							}
						}
					]
				}
			/>

		</div>
	)
}

export default App



