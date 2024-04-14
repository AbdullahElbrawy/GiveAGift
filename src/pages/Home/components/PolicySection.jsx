import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function PolicySection({ t }) {
	return (
		<CustomTextImgSection
			imgUrl="https://i.imgur.com/JdlVnei.png"
			titlePrefix={t("home.policy.titlePrefix")}
			title={t("home.policy.title")}
			description={t("home.policy.description")}
		/>
	);
}
