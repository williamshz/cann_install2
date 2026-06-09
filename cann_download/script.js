// 全局变量 - 操作系统版本映射
const osVersionsMap = {
    centos: [
        { version: '7', label: 'CentOS 7.x' },
        { version: '8', label: 'CentOS 8.x' }
    ],
    ubuntu: [
        { version: '18.04', label: 'Ubuntu 18.04' },
        { version: '20.04', label: 'Ubuntu 20.04' },
        { version: '22.04', label: 'Ubuntu 22.04' }
    ],
    euler: [
        { version: '20.03', label: 'openEuler 20.03' },
        { version: '22.03', label: 'openEuler 22.03' }
    ],
    debian: [
        { version: '10', label: 'Debian 10' },
        { version: '11', label: 'Debian 11' }
    ]
};

// 全局函数 - 更新操作系统版本选项
function updateOSVersions(osType) {
    const osVersionOptions = document.getElementById('os-version-options');
    if (!osVersionOptions) return;

    const versions = osVersionsMap[osType] || [];
    osVersionOptions.innerHTML = '';

    versions.forEach((v, index) => {
        const button = document.createElement('button');
        button.className = 'select-option' + (index === 0 ? ' active' : '');
        button.setAttribute('data-version', v.version);
        button.textContent = v.label;

        button.addEventListener('click', function() {
            const versionButtons = osVersionOptions.querySelectorAll('.select-option');
            versionButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected OS version:', v.version);
        });

        osVersionOptions.appendChild(button);
    });
}

// ============== 页面切换逻辑 ==============
function switchPage(pageName) {
    // 切换页面 section 显示
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 更新导航高亮
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector('.nav-link[data-page="' + pageName + '"]');
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 更新页面标题
    const titleMap = {
        'download': 'CANN - 昇腾AI异构计算架构 | 下载安装',
        'docs': 'CANN - 昇腾AI异构计算架构 | 安装文档',
        'hub': 'CANN - 昇腾AI异构计算架构 | 镜像中心'
    };
    if (titleMap[pageName]) {
        document.title = titleMap[pageName];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            switchPage(pageName);
        });
    });

    // 版本下拉菜单
    const versionDropdown = document.querySelector('.version-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const selectedVersion = document.querySelector('.selected-version');

    dropdownToggle.addEventListener('click', function() {
        versionDropdown.classList.toggle('open');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // 更新选中状态
            dropdownItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // 更新显示的版本
            selectedVersion.textContent = this.textContent.trim();

            // 关闭下拉菜单
            versionDropdown.classList.remove('open');

            console.log('Selected version:', this.getAttribute('data-version'));
        });
    });

    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!versionDropdown.contains(e.target)) {
            versionDropdown.classList.remove('open');
        }
    });

    // 安装方式标签切换
    // 版本标签切换
    const versionTags = document.querySelectorAll('.version-tag');
    
    versionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            versionTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const version = this.getAttribute('data-version');
            console.log('Selected version:', version);
        });
    });

    // 产品系列选择
    const productOptions = document.querySelectorAll('[data-product]');
    productOptions.forEach(option => {
        option.addEventListener('click', function() {
            productOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected product:', this.getAttribute('data-product'));
        });
    });

    // CPU架构选择
    const archOptions = document.querySelectorAll('[data-arch]');
    archOptions.forEach(option => {
        option.addEventListener('click', function() {
            archOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected architecture:', this.getAttribute('data-arch'));
        });
    });

    // 操作系统选择
    const osOptions = document.querySelectorAll('[data-os]');

    osOptions.forEach(option => {
        option.addEventListener('click', function() {
            osOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');

            const osType = this.getAttribute('data-os');
            console.log('Selected OS:', osType);

            // 更新操作系统版本选项
            updateOSVersions(osType);
        });
    });

    // 初始化操作系统版本选项
    updateOSVersions('centos');

    // 安装方式选择
    const installMethods = document.querySelectorAll('.install-method');
    
    installMethods.forEach(method => {
        method.addEventListener('click', function() {
            installMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            const methodType = this.getAttribute('data-method');
            console.log('Selected install method:', methodType);
            
            // 切换显示对应的安装指南内容
            const guideContents = document.querySelectorAll('.guide-content');
            guideContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const targetGuide = document.getElementById(methodType + '-guide');
            if (targetGuide) {
                targetGuide.style.display = 'block';
            }
        });
    });

    // 文档导航切换
    const docsNavItems = document.querySelectorAll('.docs-nav .nav-item');
    const docSections = document.querySelectorAll('.doc-section');

    docsNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            docsNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            docSections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
});

// 应用推荐配置
function applyRecommended() {
    console.log('Applying recommended configuration...');
    
    // 自动设置推荐的配置选项
    const productOptions = document.querySelectorAll('[data-product]');
    productOptions.forEach(o => o.classList.remove('active'));
    const ascend310 = document.querySelector('[data-product="ascend310"]');
    if (ascend310) ascend310.classList.add('active');

    const archOptions = document.querySelectorAll('[data-arch]');
    archOptions.forEach(o => o.classList.remove('active'));
    const aarch64 = document.querySelector('[data-arch="aarch64"]');
    if (aarch64) aarch64.classList.add('active');

    const osOptions = document.querySelectorAll('[data-os]');
    osOptions.forEach(o => o.classList.remove('active'));
    const ubuntu = document.querySelector('[data-os="ubuntu"]');
    if (ubuntu) ubuntu.classList.add('active');

    // 更新操作系统版本
    updateOSVersions('ubuntu');

    const installMethods = document.querySelectorAll('.install-method');
    installMethods.forEach(m => m.classList.remove('active'));
    const yumMethod = document.querySelector('[data-method="yum"]');
    if (yumMethod) yumMethod.classList.add('active');

    // 切换显示对应的安装指南内容
    const guideContents = document.querySelectorAll('.guide-content');
    guideContents.forEach(content => {
        content.style.display = 'none';
    });
    const targetGuide = document.getElementById('yum-guide');
    if (targetGuide) {
        targetGuide.style.display = 'block';
    }

    // 显示成功提示
    showNotification('已应用推荐配置！已自动选择适合ARM架构的产品系列、CPU架构、操作系统和安装方式。');
}

// 手动选择
function manualSelect() {
    console.log('Manual selection mode...');
    
    // 滚动到配置选择区域
    const versionSection = document.querySelector('.version-section');
    if (versionSection) {
        versionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showNotification('请在下方手动选择您需要的产品系列、CPU架构、操作系统和安装方式。');
}

// 显示通知提示
function showNotification(message) {
    // 移除已有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 创建新通知
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // 动画显示
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // 3秒后自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 复制代码块
function copyCodeBlock(button) {
    const codeBlock = button.parentElement;
    const codeText = codeBlock.querySelector('.code-text');
    
    if (codeText) {
        navigator.clipboard.writeText(codeText.textContent).then(() => {
            button.textContent = '已复制';
            setTimeout(() => {
                button.textContent = '复制';
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
            button.textContent = '复制失败';
            setTimeout(() => {
                button.textContent = '复制';
            }, 2000);
        });
    }
}

// ============== 镜像中心交互逻辑 ==============

// 分类名称映射
const categoryNames = {
    all: '全部镜像',
    toolkit: 'Toolkit',
    runtime: '运行时',
    framework: '框架镜像',
    dev: '开发环境'
};

// 图标映射
const categoryIcons = {
    toolkit: '🔧',
    runtime: '⚡',
    framework: '🧠',
    dev: '💻'
};

// 镜像中心导航切换
document.addEventListener('DOMContentLoaded', function() {
    // 镜像分类导航点击
    const hubNavItems = document.querySelectorAll('.hub-nav .nav-item[data-category]');
    hubNavItems.forEach(item => {
        item.addEventListener('click', function() {
            hubNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterImagesByCategory(category);
        });
    });

    // 特殊操作按钮（镜像下载、部署指南）
    const actionItems = document.querySelectorAll('.hub-nav .nav-item[data-action]');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');

            // 先取消所有导航项的激活状态（但不激活镜像分类按钮）
            document.querySelectorAll('.hub-nav .nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            if (action === 'download') {
                showNotification('已打开镜像下载中心');
                setTimeout(() => openDownloadModal(), 300);
            } else if (action === 'guide') {
                showNotification('正在跳转到部署指南...');
                setTimeout(() => {
                    switchPage('docs');
                    setTimeout(() => {
                        // 高亮安装文档标题并添加动画提示
                        const docsHeader = document.querySelector('#docs .docs-header');
                        if (docsHeader) {
                            docsHeader.style.transition = 'all 0.5s ease';
                            docsHeader.style.background = 'rgba(0, 168, 255, 0.15)';
                            docsHeader.style.padding = '20px 24px';
                            docsHeader.style.borderRadius = '8px';
                            setTimeout(() => {
                                docsHeader.style.background = '';
                                docsHeader.style.padding = '';
                                docsHeader.style.borderRadius = '';
                            }, 2000);
                        }
                    }, 300);
                }, 400);
            }
        });
    });

    // 镜像下载模态框 - 标签切换
    const downloadModal = document.getElementById('download-modal');
    if (downloadModal) {
        const tabBtns = downloadModal.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tab = this.getAttribute('data-tab');
                switchTab(tab);
            });
        });
    }

    // 架构筛选
    const archFilter = document.getElementById('arch-filter');
    if (archFilter) {
        archFilter.addEventListener('change', function() {
            applyFilters();
        });
    }

    // 版本筛选
    const versionFilter = document.getElementById('version-filter');
    if (versionFilter) {
        versionFilter.addEventListener('change', function() {
            applyFilters();
        });
    }

    // 初始化筛选计数
    updateImageCounts();
});

// 按分类筛选镜像
function filterImagesByCategory(category) {
    const imageCards = document.querySelectorAll('.hub-images .image-card');
    
    imageCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'flex';
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });

    applyFilters();
}

// 应用所有筛选条件
function applyFilters() {
    const archFilter = document.getElementById('arch-filter');
    const versionFilter = document.getElementById('version-filter');
    const activeNavItem = document.querySelector('.hub-nav .nav-item.active[data-category]');
    
    const selectedArch = archFilter ? archFilter.value : 'all';
    const selectedVersion = versionFilter ? versionFilter.value : 'all';
    const activeCategory = activeNavItem ? activeNavItem.getAttribute('data-category') : 'all';

    const imageCards = document.querySelectorAll('.hub-images .image-card');
    let visibleCount = 0;

    imageCards.forEach(card => {
        // 先检查分类
        const cardCategory = card.getAttribute('data-category');
        const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;

        // 检查架构
        const cardArch = card.getAttribute('data-arch');
        const archMatch = selectedArch === 'all' || cardArch.includes(selectedArch);

        // 检查版本
        const cardVersion = card.getAttribute('data-version');
        const versionMatch = selectedVersion === 'all' || cardVersion === selectedVersion;

        // 显示或隐藏
        if (categoryMatch && archMatch && versionMatch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    console.log(`筛选结果: 显示 ${visibleCount} 个镜像`);
}

// 更新各分类的镜像数量
function updateImageCounts() {
    const imageCards = document.querySelectorAll('.hub-images .image-card');
    const counts = {
        all: imageCards.length,
        toolkit: 0,
        runtime: 0,
        framework: 0,
        dev: 0
    };

    imageCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (counts.hasOwnProperty(category)) {
            counts[category]++;
        }
    });

    // 更新显示
    for (const [key, count] of Object.entries(counts)) {
        const countEl = document.getElementById(`count-${key}`);
        if (countEl) {
            countEl.textContent = count;
        }
    }
}

// 显示镜像详情模态框
let currentImageData = null;

function showImageModal(button) {
    const card = button.closest('.image-card');
    if (!card) return;

    // 获取镜像数据
    const name = card.getAttribute('data-name');
    const version = card.getAttribute('data-version');
    const arch = card.getAttribute('data-arch');
    const size = card.getAttribute('data-size');
    const os = card.getAttribute('data-os');
    const category = card.getAttribute('data-category');
    const icon = card.querySelector('.image-icon')?.textContent || '🐳';

    // 获取标签
    const tagEl = card.querySelector('.image-tag');
    const tagText = tagEl ? tagEl.textContent : '';

    // 保存当前数据
    currentImageData = { name, version, arch, size, os, category, icon, tag: tagText };

    // 更新模态框内容
    document.getElementById('modal-icon').textContent = icon;
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-subtitle').textContent = `${version} · ${arch} · ${os}`;
    
    const modalTag = document.getElementById('modal-tag');
    if (tagText) {
        modalTag.textContent = tagText;
        modalTag.style.display = 'inline-block';
    } else {
        modalTag.style.display = 'none';
    }

    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-version').textContent = version;
    document.getElementById('modal-arch').textContent = arch;
    document.getElementById('modal-os').textContent = os;
    document.getElementById('modal-size').textContent = size;
    document.getElementById('modal-category').textContent = categoryNames[category] || category;

    // 生成拉取命令
    const osVersionTag = os.includes('22.04') ? 'ubuntu22.04' : 'ubuntu20.04';
    const pullCmd = `docker pull ascendhub.huawei.com/public-ascendhub/${name}:${version}-${osVersionTag}`;
    document.getElementById('modal-pull-cmd').textContent = pullCmd;

    // 生成运行命令
    const runCmd = `docker run -it --rm --device=/dev/davinci0 ascendhub.huawei.com/public-ascendhub/${name}:${version}-${osVersionTag} bash`;
    document.getElementById('modal-run-cmd').textContent = runCmd;

    // 显示模态框
    const modal = document.getElementById('image-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 关闭镜像详情模态框
function closeImageModal(event) {
    if (event && event.target && event.target.closest('.modal') && event.type === 'click') {
        // 如果点击的是模态框内部，不关闭
        return;
    }
    
    const modal = document.getElementById('image-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// 复制模态框中的代码
function copyModalCode(type) {
    let codeText = '';
    let button = null;
    
    if (type === 'pull') {
        codeText = document.getElementById('modal-pull-cmd').textContent;
        button = event.target;
    } else if (type === 'run') {
        codeText = document.getElementById('modal-run-cmd').textContent;
        button = event.target;
    }

    if (codeText && button) {
        navigator.clipboard.writeText(codeText).then(() => {
            const originalText = button.textContent;
            button.textContent = '已复制';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
            showNotification('命令已复制到剪贴板');
        }).catch(err => {
            console.error('复制失败:', err);
            showNotification('复制失败，请手动复制');
        });
    }
}

// 复制所有命令
function copyAllCommands() {
    const pullCmd = document.getElementById('modal-pull-cmd').textContent;
    const runCmd = document.getElementById('modal-run-cmd').textContent;
    const allCommands = `# 拉取镜像\n${pullCmd}\n\n# 运行容器\n${runCmd}`;

    navigator.clipboard.writeText(allCommands).then(() => {
        showNotification('所有命令已复制到剪贴板');
        setTimeout(() => {
            closeImageModal();
        }, 800);
    }).catch(err => {
        console.error('复制失败:', err);
        showNotification('复制失败，请手动复制');
    });
}

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const imageModal = document.getElementById('image-modal');
        if (imageModal && imageModal.classList.contains('show')) {
            closeImageModal();
            return;
        }
        const downloadModal = document.getElementById('download-modal');
        if (downloadModal && downloadModal.classList.contains('show')) {
            closeDownloadModal();
        }
    }
});

// ============== 镜像下载模态框交互 ==============

function openDownloadModal() {
    const modal = document.getElementById('download-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeDownloadModal(event) {
    if (event && event.target && event.target.closest('.modal') && event.type === 'click') {
        return;
    }
    const modal = document.getElementById('download-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// 标签页切换（镜像下载模态框内）
function switchTab(tabName) {
    const modal = document.getElementById('download-modal');
    if (!modal) return;

    // 切换按钮状态
    const tabBtns = modal.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });

    // 切换内容显示
    const tabContents = modal.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('data-tab') === tabName) {
            content.classList.add('active');
        }
    });
}

// 复制代码块文本（通用函数，基于 button 同级的 code 元素）
function copyCodeText(button) {
    const codeBlock = button.closest('.modal-code-block');
    if (!codeBlock) return;
    const codeText = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = button.textContent;
        button.textContent = '已复制';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
        showNotification('命令已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
        showNotification('复制失败，请手动复制');
    });
}

// 模拟下载
function simulateDownload(event, fileName) {
    if (event) event.preventDefault();
    showNotification('准备下载: ' + fileName);

    setTimeout(() => {
        showNotification('✓ 下载任务已添加到队列（示例功能）');
        console.log('Download simulated:', fileName);
    }, 600);
}