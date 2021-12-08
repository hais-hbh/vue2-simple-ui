module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  base: "/vue2-simple-ui/",
  themeConfig: {
    sidebar: [
      { title: "入门", children: ["/install/", "/get-start/"] },
      { title: "组件", children: ["/components/button"] },
    ],
  },
};
