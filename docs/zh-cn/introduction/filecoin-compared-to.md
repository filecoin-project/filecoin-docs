---
title: Filecoin 对比…
description: Filecoin 与其他功能类似的文件存储和分布式系统的对比。
---

# Filecoin 对比…

Filecoin 结合了其他文件存储和分布式系统的许多元素，它们使得 Filecoin 成为一个独特的系统。Filecoin 是一个开放的点对点网络，同时提供经济奖励和证明，以确保文件的正确存储。本页面将 Filecoin 与其他具有相同属性的技术进行比较。

- [Filecoin vs. Amazon S3, Google Cloud Storage](#filecoin-vs-amazon-s3-google-cloud-storage)
- [Filecoin vs. Bitcoin](#filecoin-vs-bitcoin)

### Filecoin vs. Amazon S3, Google Cloud Storage

<table class="comparison">
    <tr>
        <th></th>
        <th>Filecoin</th>
        <th>Amazon S3, Google Cloud Storage</th>
    </tr>
    <tr>
        <td>主要用例</td>
        <td>以更有竞争力的价格存储文件</td>
        <td>使用熟悉且被广泛支持的服务存储文件</td>
    </tr>
    <tr>
        <td>价格</td>
        <td>在有竞争力的开放市场自由定价</td>
        <td>由公司制定价格</td>
    </tr>
    <tr>
        <td>组成</td>
        <td>许多小型，独立的存储提供者</td>
        <td>几家大公司</td>
    </tr>
    <tr>
        <td>可靠性统计</td>
        <td>由网络独立检查并可以公开验证</td>
        <td>由公司自行报告统计数据</td>
    </tr>
    <tr>
        <td>API</td>
        <td>应用程序可以使用 Filecoin 协议访问所有存储提供者</td>
        <td>应用程序必须针对每个存储提供者的 API 单独开发</td>
    </tr>
    <tr>
        <td>检索</td>
        <td>有竞争力的文件取回价格</td>
        <td>为了留住用户，取回价格往往高于存储价格</td>
    </tr>
    <tr>
        <td>故障处理</td>
        <td>如果文件丢失，网络会自动为用户退款</td>
        <td>文件丢失或失效，公司会给用户补偿信用额度</td>
    </tr>
    <tr>
        <td>支持</td>
        <td>发生故障时，均由 Filecoin 协议检测处理，无需人工干预</td>
        <td>发生故障时，用户需要联系技术支持人员寻求帮助</td>
    </tr>
    <tr>
        <td>物理位置</td>
        <td>矿工分布在全球各地</td>
        <td>仅限提供商数据中心位置</td>
    </tr>
    <tr>
        <td>行业门槛</td>
        <td>成为存储提供者门槛低 (只需要计算机、硬盘和网络连接)</td>
        <td>成为存储提供者门槛高 (需要考虑法律协议、市场营销以及工作人员)</td>
    </tr>
</table>

### Filecoin vs. Bitcoin

<table class="comparison">
    <tr>
        <th></th>
        <th>Filecoin</th>
        <th>Bitcoin</th>
    </tr>
    <tr>
        <td>主要用例</td>
        <td>文件存储</td>
        <td>支付网络</td>
    </tr>
    <tr>
        <td>数据存储</td>
        <td>擅长海量文件的低价存储</td>
        <td>以高昂的代价在区块链存储少量的数据</td>
    </tr>
    <tr>
        <td>证明</td>
        <td>使用复制证明和时空证明保护区块链</td>
        <td>使用工作量证明保护区块链</td>
    </tr>
    <tr>
        <td>共识算力</td>
        <td>矿工提供的存储越大算力越大</td>
        <td>矿工的计算速度越快算力越大</td>
    </tr>
    <tr>
        <td>挖矿硬件</td>
        <td>硬盘、GPU 和 CPU</td>
        <td>ASIC</td>
    </tr>
    <tr>
        <td>挖掘有用性</td>
        <td>挖掘使得户的文件被存储</td>
        <td>挖掘产生更多的热量</td>
    </tr>
    <tr>
        <td>矿工类型</td>
        <td>存储矿工、检索矿工和修复矿工</td>
        <td>均为工作量证明矿工</td>
    </tr>
    <tr>
        <td>正常运行时间要求</td>
        <td>存储矿工持续在线会得到奖励，离线会受到惩罚</td>
        <td>矿工离线不会受到惩罚</td>
    </tr>
    <tr>
        <td>网络状态</td>
        <td>测试网</td>
        <td>2009 年主网上线</td>
    </tr>
</table>
