import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function AboutSection() {
	return (
		<CustomTextImgSection
			imgUrl="https://i.ibb.co/F4n7hhn/about.png"
			className={"w-full"}
			reverse
			secondary
			textOn={true}
		/>
	);
}
